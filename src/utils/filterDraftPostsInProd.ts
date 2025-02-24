import type { MarkdownInstance } from "astro";
import type { Frontmatter } from "@types.ts";

export const filterDraftPostsInProd = ({
  frontmatter,
}: MarkdownInstance<Frontmatter>): boolean =>
  !(frontmatter.draft && import.meta.env.PROD);
