---
title: "Cloudflare Durable Objects - Weird and Wonderful"
datetime: 2024-11-09
tags: ["cloudflare", "workers", "serverless"]
draft: true
---

## Background

Let's start with some background. If you're already familiar with Cloudflare and Cloudflare workers, you can skip
directly to the [Durable objects](#durable-objects) section.

### What is Cloudflare?

Cloudflare started in 2009 and has since grown into a global cloud service. They are known for their CDN, DNS, DDoS
protection, and WAF services. To run these services, Cloudflare developed
their [global network](https://www.cloudflare.com/sv-se/network/) (currently 330+ cities) that provides low latency to
most part of the world.

The services Cloudflare offered were well received, but customers wanted more, especially run custom logic, like
localization and authentication on the edge.

In 2017, to answer this need, Cloudflare took the bet to open up their network to developers, and go into the edge
computing space. Rough timeline of services:

- **2017** - Workers
- **2019** - KV store
- **2021** - Pages and _**Durable Objects**_
- **2022** - SQLite (D1), Object Storage (R2)

### What are Workers 👷?

Workers were launched in 2017 and runs on Cloudflare's global network, and is a serverless, edge compute service. They
are usually written in Javascript (though WASM, Python and Rust is supported) as a handler that takes an incoming
request and returns a response.

There are two main aspects that I think make them an interesting alternative to other serverless services:

- They run on V8 isolates ([article](https://blog.cloudflare.com/cloud-computing-without-containers/)), making them
  extremely lightweight. Each worker has a memory overhead of 3 MB, and with a cold start time of as little as 5 ms.
- They are running on the edge by default, on Cloudflare's global network, which provides low latency to most parts of
  the world.

These things make them **fast** and **cheap**, and ideal for tasks like redirects, localization, authentication, and
A/B.

Let's have a look at some code. This example takes an incoming request, checks the country
code ([reference](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties)), and
redirects to a different page if the country is Sweden. Read
the [Cloudflare documentation](https://developers.cloudflare.com/workers/examples/) for more excellent examples.

```typescript
export default {
    async fetch(request): Promise<Response> {
        const country = request.cf.country;
        if (country != null && country == 'SE') {
            return Response.redirect("https://better.com/se";
        }
        return fetch(request);
    },
}
satisfies
ExportedHandler;
```

Workers have some limitations that are worth mentioning:

- Max 128 MB memory
- Max 50 ms CPU time
- No persistent storage (but can call other Cloudflare services)

Despite these limitations, workers are a great alternative to traditional serverless services, and are especially useful
for tasks that are cost sensitive and require low latency.

By now you might be asking yourself:

> If workers are so great, why do we need Durable Objects?

Well, there is a downside to workers: **they are stateless**. This can be easily solved by combining workers with other
Cloudflare services, like SQLite (D1).

Unfortunately, if we want strong consistency with our data store, all requests have to go from the low latency edge
network to a data center somewhere, and we are back to _not so great_ latency again.

![Downside of workers](/img/durable-objects/downside-of-workers.png)

This is where **Durables Objects** come in.

## Durable Objects

First of all, what are Durable Objects (DO)? They are/have:

- Built on top of workers
- Built-in persistence (K/V store, SQLite)
- Each instance (ID)
  - Single-threaded
  - _Data co-located with compute_
  - Owns its state
- Written in JavaScript or WASM

They key points here are that 1) requests are single-threaded, and 2) data is co-located with compute. Why is this good? Well, it turns out that most

Let's look at some code

```typescript

```

![Durable Objects Meme](/img/durable-objects/meme-durable-objects.png)

- Websockets
- Wake up alarms
- RPC from workers
- SQLite (with PITR) since September

### Use cases

### Notable mentions

## Summary

Durable Objects is a weird and wonderful alternative to (legacy!?) serverless services. They are fast, cheap, and easy
to use, and run on Cloudflare's global network.

They're built for a distributed, single-threaded model and can store data persistently via K/V storage or SQLite.

## Recommended reading

-

Cloudflare: [Durable Objects: Easy, Fast, Correct - choose three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/) -

- Cloudflare: [Cloud Computing without Containers](https://blog.cloudflare.com/cloud-computing-without-containers/) -
  Overview of Workers
- Cloudflare: [Workers Tutorials](https://developers.cloudflare.com/workers/tutorials/)
