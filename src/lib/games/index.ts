import type { MarkdownInstance } from "astro";
import { gameSchema } from "./schema";
import type { Game } from "./schema";

const gameModules = import.meta.glob<MarkdownInstance<Record<string, unknown>>>(
  "../../games/*.md",
  { eager: true }
);

function slugFromPath(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

export function loadGames(): Game[] {
  return Object.entries(gameModules).map(([path, mod]) => {
    const parsed = gameSchema.safeParse(mod.frontmatter);
    if (!parsed.success) {
      throw new Error(
        `Invalid game frontmatter in ${path}: ${parsed.error.message}`
      );
    }
    return parsed.data;
  });
}

export function bggUrl(game: Game): string | undefined {
  return game.bggId
    ? `https://boardgamegeek.com/boardgame/${game.bggId}`
    : undefined;
}
