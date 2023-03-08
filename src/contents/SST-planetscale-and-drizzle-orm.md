---
title: "SST, Planetscale and Drizzle ORM"
datetime: 2023-03-08
tags: ["aws", "sst", "planetscale", "drizzle-orm"]
---

A few weeks back [SST](https://sst.dev) released their 2.0 version. It is a (almost?) complete rewrite of their framework, which I wanted
to try it out.

In this post I will show you how to use the 2.0 version of [SST](https://sst.dev) to build a serverless API with a serverless MySQL
database hosted on [Planetscale](https://planetscale.com) and
a [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm). We will implement the database structure as
this [SST Guide: How to use PlanetScale in your serverless app](https://sst.dev/examples/how-to-use-planetscale-in-your-serverless-app.html),
but adapt it for SST 2.0 and add Drizzle ORM on top for typesafe database queries.

## Let's go!

Before we get started, you need the following tools installed

- SST CLI configured
- [Planetscale](https://planetscale.com) account
  - [CLI](https://docs.planetscale.com/cli/installation) installed
  - A database created called `magnusscale`. (**Note:** The username and password will be needed later.)

## 1. Create the Planetscale table

First we create our counter table

- Run command `pscale shell magnusscale main`
- Run the following SQL commands:

```sql
CREATE TABLE IF NOT EXISTS counter
(
    counter VARCHAR
(
    255
) PRIMARY KEY, tally INT);
INSERT INTO counter (counter, tally)
VALUES ('hits', 0);
```

## 2. Store SST secret

Our main secret in this project is the planetscale password. We store it in the SST secret store.

```
pnpm sst secrets set PLANETSCALE_PASSWORD <YOUR PASSWORD>
```

## 3. Create SST project

Now we create our SST project

```
pnpx create-sst@latest --template=base/example magnusscale
cd magnusscale
pnpm install
```

## 4. Our stack

Then we define our stack. Here we create 3 references.

- PLANETSCALE_PASSWORD - The password we stored in the SST secret
- PLANETSCALE_USERNAME - The database username
- PLANETSCALE_HOST - The host we use to connect to the database. I think this is the same for all Planetscale databases.

```typescript
// stacks/MagnusScaleStack.ts
import { Api, Config, StackContext } from "sst/constructs";

export function MagnusScaleStack({ stack }: StackContext) {
  const PLANETSCALE_PASSWORD = new Config.Secret(stack, "PLANETSCALE_PASSWORD");
  const PLANETSCALE_USERNAME = new Config.Parameter(
    stack,
    "PLANETSCALE_USERNAME",
    {
      value: "<YOUR USERNAME>",
    }
  );
  const PLANETSCALE_HOST = new Config.Parameter(stack, "PLANETSCALE_HOST", {
    value: "aws.connect.psdb.cloud",
  });

  // Create an HTTP API
  const api = new Api(stack, "Api", {
    routes: {
      "POST /": "packages/functions/src/lambda.handler",
    },
  });

  // Make the secrets and config available to the lambda
  api.bind([PLANETSCALE_HOST, PLANETSCALE_USERNAME, PLANETSCALE_PASSWORD]);

  // Show the endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
```

## 5. Set up Drizzle ORM

Now we can configure our database schema to match the table we created earlier. This will allow us to get typescript
types in our queries.

```typescript
// packages/core/schema.ts
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const counters = mysqlTable("counter", {
  counter: varchar("counter", { length: 255 }).primaryKey(),
  tally: int("tally").notNull(),
});
```

Next we create a `db.ts` with the database connection and queries.

```typescript
// packages/core/db.ts
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { connect } from "@planetscale/database";
import { counters } from "./schema";

import { Config } from "sst/node/config";
import { eq } from "drizzle-orm/expressions";
import { sql } from "drizzle-orm/sql";

const connection = connect({
  host: Config.PLANETSCALE_HOST,
  username: Config.PLANETSCALE_USERNAME,
  password: Config.PLANETSCALE_PASSWORD,
});

export const db = drizzle(connection);

export async function getCounter(name: string) {
  const result = await db
    .select()
    .from(counters)
    .where(eq(counters.counter, name));

  if (result.length < 1) {
    throw new Error(`No results found for counter ${name}`);
  }

  return result[0];
}

export async function increaseCounter(name: string) {
  const result = await db
    .update(counters)
    .set({
      tally: sql`tally
            + 1`,
    })
    .where(eq(counters.counter, name));
}
```

## 6. The lambda function

Finally, we create our lambda function. Here we use the `getCounter` and `increaseCounter` functions from `db.ts`.

```typescript
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getCounter, increaseCounter } from "../../core/db";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  await increaseCounter("hits");
  const counter = await getCounter("hits");
  return {
    statusCode: 200,
    headers: { "Content-Type": "json/application" },
    body: JSON.stringify({ count: counter.tally }),
  };
};
```

## 7. Deploy

If we did everything correctly, we can now deploy our app.

```
pnpm run dev
```

**Output:**

```
SST v2.1.15  ready!

➜  App:     magnusscale
   Stage:   dev
   Console: https://console.sst.dev/magnusscale/dev

✔  Deployed:
   MagnusScaleStack
   ApiEndpoint: https://3zohsaahd3.execute-api.eu-west-1.amazonaws.com
```

## 8. Test

The endpoint output from the deploy command is the endpoint we can use to test our app:

```json
curl -XPOST https://3zohsaahd3.execute-api.eu-west-1.amazonaws.com
{
  "count": 1
}
```

### Success 🎉!

<br>

# Conclusion

SST, Planetscale and Drizzle ORM are all great. **SST** 2.0 works great, and I especially enjoyed using the `Secret` and `Config` constructs. Feels a lot better than using .env files, and you get typesafety for your configuration (they might have existed pre-2.0).

I had not used Drizzle ORM or **Planetscale** before, but I can recommend both. The Planetscale CLI is great, and creating an account and setting up a database was easy.

**Drizzle** ORM was fairly easy to use, though I had some problem with getting the types in my queries right. Tough, this was probably due to my lack of experience with typescript, than anyhting else.
The Drizzle team also has a tool called [Drizzle Kit](https://github.com/drizzle-team/drizzle-kit-mirror) for handling migrations that looks great, but I have yet to try it.

Overall, I look forward to using these tools in the future.

## Links

- [SST: How to use PlanetScale in your serverless app](https://sst.dev/examples/how-to-use-planetscale-in-your-serverless-app.html)
- [Drizzle ORM: Connect using PlanetScale Serverless client](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/mysql-core/README.md#connect-using-planetscale-serverless-client)
