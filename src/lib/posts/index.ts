import type { MarkdownInstance } from "astro";
import { postSchema } from "./schema";
import type { Post } from "./schema";

const postModules = import.meta.glob<MarkdownInstance<Record<string, unknown>>>(
  "../../contents/**/*.{md,mdx}",
  { eager: true }
);

/**
 * Loads every post, validating frontmatter at build time. An invalid post fails
 * the build rather than rendering a half-broken page, matching `@lib/games`.
 */
export function loadPosts(): MarkdownInstance<Post>[] {
  return Object.entries(postModules).map(([path, mod]) => {
    const parsed = postSchema.safeParse(mod.frontmatter);
    if (!parsed.success) {
      throw new Error(
        `Invalid post frontmatter in ${path}: ${parsed.error.message}`
      );
    }
    return mod as unknown as MarkdownInstance<Post>;
  });
}
