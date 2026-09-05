import { z } from "zod";

/**
 * Frontmatter as it actually appears in `src/contents/*.{md,mdx}`.
 *
 * Two things are load-bearing here:
 *  - `datetime` arrives as a `Date`, not a string: YAML parses an unquoted
 *    `datetime: 2019-04-28` into a Date object. Quoted values stay strings, so
 *    both are accepted.
 *  - `slug` is optional. 8 of the posts omit it and fall back to a slug derived
 *    from the title (see `@utils/slugify`).
 */
export const postSchema = z.object({
  title: z.string(),
  datetime: z.union([z.string(), z.date()]),
  tags: z.array(z.string()).default([]),
  slug: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  ogImage: z.string().optional(),
  featured: z.boolean().optional(),
  draft: z.boolean().optional(),
});

export type Post = z.infer<typeof postSchema>;
