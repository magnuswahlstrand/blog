import type { RecipeFlow } from "../../lib/recipe-flow/schema";

export const babaGhanoush: RecipeFlow = {
  title: "Baba Ghanoush",
  servings: "4",
  ingredients: [
    { id: "eggplant", label: "2 eggplants" },
    { id: "garlic", label: "2 garlic cloves" },
    { id: "lemon", label: "1/2 lemon" },
    { id: "salt", label: "1 tsp salt" },
    { id: "tahini", label: "0.6 dl tahini" },
    { id: "olive-oil", label: "2 tbsp olive oil" },
  ],
  operations: [
    {
      id: "bake-eggplant",
      label: "Bake 50 min at 250°C",
      inputs: ["eggplant"],
    },
    {
      id: "cool-chop-eggplant",
      label: "Cool 30 min, chop finely",
      inputs: ["bake-eggplant"],
    },
    {
      id: "prep-garlic",
      label: "Mince",
      inputs: ["garlic"],
    },
    {
      id: "marinate-garlic",
      label: "Mix, rest 10 min",
      inputs: ["prep-garlic", "lemon", "salt"],
    },
    {
      id: "combine",
      label: "Mix",
      inputs: ["cool-chop-eggplant", "marinate-garlic", "tahini", "olive-oil"],
    },
  ],
};
