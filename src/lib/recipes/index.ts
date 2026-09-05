import type { MarkdownInstance } from "astro";
import { recipeSchema } from "./schema";
import type { Recipe } from "./schema";

// Recipes are routed markdown pages, so Astro renders them without going
// through here. Globbing them anyway lets the recipes index validate every
// file at build time, the same guarantee `@lib/posts` and `@lib/games` give.
const recipeModules = import.meta.glob<
  MarkdownInstance<Record<string, unknown>>
>("../../pages/recipes/*.md", { eager: true });

export function loadRecipes(): MarkdownInstance<Recipe>[] {
  return Object.entries(recipeModules).map(([path, mod]) => {
    const parsed = recipeSchema.safeParse(mod.frontmatter);
    if (!parsed.success) {
      throw new Error(
        `Invalid recipe frontmatter in ${path}: ${parsed.error.message}`
      );
    }
    return mod as unknown as MarkdownInstance<Recipe>;
  });
}

/** Newest first; recipes without an `added` sort last. */
export function getSortedRecipes(): MarkdownInstance<Recipe>[] {
  return loadRecipes().sort((a, b) =>
    (b.frontmatter.added ?? "").localeCompare(a.frontmatter.added ?? "")
  );
}
