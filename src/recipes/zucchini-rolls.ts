import type { RecipeFlow } from "../../lib/recipe-flow/schema";

export const zucchiniRolls: RecipeFlow = {
  title: "Zucchini Tapenade Rolls",
  servings: "4",
  ingredients: [
    { id: "zucchini", label: "2 zucchini" },
    { id: "tapenade", label: "2–3 tbsp tapenade" },
    { id: "cream-cheese", label: "100 g cream cheese" },
    { id: "olive-oil", label: "1 tbsp olive oil" },
    { id: "lemon-zest", label: "Lemon zest" },
    { id: "pepper", label: "Black pepper" },
  ],
  operations: [
    {
      id: "make-filling",
      label: "Mix",
      inputs: ["cream-cheese", "tapenade", "lemon-zest", "pepper", "olive-oil"],
    },
    {
      id: "slice-zucchini",
      label: "Slice",
      inputs: ["zucchini"],
    },
    {
      id: "cook-ribbons",
      label: "Cook",
      inputs: ["slice-zucchini"],
    },
    {
      id: "roll",
      label: "Roll",
      inputs: ["cook-ribbons", "make-filling"],
    },
  ],
};
