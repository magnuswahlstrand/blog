import type { RecipeFlow } from "../../lib/recipe-flow/schema";
import type { operationSchema } from "../../lib/recipe-flow/schema";

export const katsuSando: RecipeFlow = {
  title: "Katsu Sando",
  added: "2026-09",
  ingredients: [
    { id: "ketchup", label: "100 ml ketchup" },
    { id: "worcestershire-sauce", label: "2 tbsp Worcestershire sauce" },
    { id: "soy-sauce-1", label: "2 tbsp Japanese soy sauce" },
    { id: "honey", label: "2 tbsp honey" },
    { id: "garlic", label: "1 garlic clove, finely grated" },
    { id: "cabbage-slaw", label: "Cabbage Salad 150 g" },
    { id: "soy-sauce-2", label: "½ tbsp Japanese soy sauce" },
    { id: "sesame-oil", label: "1 tsp sesame oil" },
    { id: "vinegar", label: "1 tsp rice vinegar or white wine vinegar" },
  ],
  operations: [],
  steps: [
    "Mix ketchup, Worcestershire sauce, 2 tbsp Japanese soy sauce, and 2 tbsp honey for the Tonkatsu sauce",
    "Add finely grated garlic clove to the sauce",
    "Prepare Cabbage Salad with 150 g cabbage",
    "Season cabbage with ½ tbsp Japanese soy sauce, 1 tsp sesame oil, and 1 tsp rice vinegar or white wine vinegar",
  ],
  sources: [
    {
      label: "ICA Recept",
      url: "https://www.ica.se/recept/katsu-sando-japansk-sandwich-med-schnitzel-727744/",
    },
  ],
};
