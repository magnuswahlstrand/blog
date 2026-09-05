import { SITE } from "src/config";
import rss from "@astrojs/rss";
import slugify from "@utils/slugify";
import getSortedPosts from "@utils/getSortedPosts";
import { loadPosts } from "../lib/posts";

const posts = getSortedPosts(loadPosts());

export const GET = () =>
  rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: posts.map(({ frontmatter }) => ({
      link: slugify(frontmatter),
      title: frontmatter.title,
      description: frontmatter.description,
      pubDate: new Date(frontmatter.datetime),
    })),
  });
