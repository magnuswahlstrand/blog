import type { RecipeFlow } from "../lib/recipe-flow/schema";
import { babaGhanoush } from "./baba-ghanoush";
import { kimchi } from "./kimchi";
import { kinesiskKrossadGurksallad } from "./kinesisk-krossad-gurksallad";
import { sousVideScrambledEggs } from "./sous-vide-scrambled-eggs";
import { zucchiniRolls } from "./zucchini-rolls";

export const recipes: Record<string, RecipeFlow> = {
  kimchi,
  "baba-ghanoush": babaGhanoush,
  "kinesisk-krossad-gurksallad": kinesiskKrossadGurksallad,
  "sous-vide-scrambled-eggs": sousVideScrambledEggs,
  "zucchini-rolls": zucchiniRolls,
};
