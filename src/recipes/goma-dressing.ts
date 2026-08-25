import type { RecipeFlow } from "../../lib/recipe-flow/schema";

export const gomaDressing: RecipeFlow = {
  title: "Japanese Sesame Dressing (Goma Dressing)",
  added: "2026-08",
  ingredients: [
    { id: "mayonnaise", label: "3 tbsp mayonnaise" },
    { id: "tahini", label: "2 tbsp tahini" },
    { id: "soy-sauce", label: "1 tbsp soy sauce" },
    { id: "rice-vinegar", label: "1 tbsp rice vinegar" },
    { id: "sugar", label: "2–3 tsp sugar or honey" },
    { id: "sesame-oil", label: "1 tsp sesame oil" },
    { id: "water", label: "1–2 tbsp water, to thin" },
    {
      id: "sesame-seeds",
      label: "1 tbsp sesame seeds, toasted and crushed (optional)",
    },
  ],
  steps: [
    "Mix everything except the water until smooth.",
    "Gradually add water until it's easily pourable.",
    "If using, fold in toasted and crushed sesame seeds for a more authentic flavour.",
  ],
  operations: [
    {
      id: "mix-base",
      label: "Mix",
      inputs: [
        "mayonnaise",
        "tahini",
        "soy-sauce",
        "rice-vinegar",
        "sugar",
        "sesame-oil",
      ],
    },
    {
      id: "thin",
      label: "Thin",
      inputs: ["mix-base", "water"],
    },
    {
      id: "finish",
      label: "Add sesame seeds",
      inputs: ["thin", "sesame-seeds"],
    },
  ],
};
