import type { RecipeFlow } from "../../lib/recipe-flow/schema";

export const sousVideScrambledEggs: RecipeFlow = {
  title: "Sous Vide Scrambled Eggs",
  servings: "2",
  ingredients: [
    { id: "eggs", label: "6 eggs" },
    { id: "milk", label: "4 tsp milk" },
    { id: "cream", label: "4 tsp heavy cream" },
    { id: "butter", label: "25 g butter" },
  ],
  operations: [
    {
      id: "brown-butter",
      label: "Brown butter in pan",
      inputs: ["butter"],
    },
    {
      id: "whisk",
      label: "Whisk together",
      inputs: ["eggs", "milk", "cream", "brown-butter"],
    },
    {
      id: "sous-vide",
      label: "Sous vide 75°C, 16 min",
      inputs: ["whisk"],
    },
  ],
};
