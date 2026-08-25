import type { RecipeFlow } from "../lib/recipe-flow/schema";
import { babaGhanoush } from "./baba-ghanoush";
import { chickpeaSalad } from "./chickpea-salad";
import { gomaDressing } from "./goma-dressing";
import { kimchi } from "./kimchi";
import { kinesiskKrossadGurksallad } from "./kinesisk-krossad-gurksallad";
import { sousVideScrambledEggs } from "./sous-vide-scrambled-eggs";
import { xinjiangCuminLamb } from "./xinjiang-cumin-lamb";
import { zucchiniRolls } from "./zucchini-rolls";

export const recipes: Record<string, RecipeFlow> = {
  kimchi,
  "baba-ghanoush": babaGhanoush,
  "chickpea-salad": chickpeaSalad,
  "goma-dressing": gomaDressing,
  "kinesisk-krossad-gurksallad": kinesiskKrossadGurksallad,
  "sous-vide-scrambled-eggs": sousVideScrambledEggs,
  "xinjiang-cumin-lamb": xinjiangCuminLamb,
  "zucchini-rolls": zucchiniRolls,
};
