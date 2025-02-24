import type { MarkdownInstance } from "astro";
import type { Frontmatter } from "../types";
import { filterDraftPostsInProd } from "@utils/filterDraftPostsInProd.ts";

const getSortedPosts = (posts: MarkdownInstance<Frontmatter>[]) =>
  posts
    .filter(filterDraftPostsInProd)
    .sort(
      (a, b) =>
        Math.floor(new Date(b.frontmatter.datetime).getTime() / 1000) -
        Math.floor(new Date(a.frontmatter.datetime).getTime() / 1000)
    );

export default getSortedPosts;
