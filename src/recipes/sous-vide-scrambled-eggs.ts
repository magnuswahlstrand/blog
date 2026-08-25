import type { RecipeFlow } from "../../lib/recipe-flow/schema";

export const sousVideScrambledEggs: RecipeFlow = {
  title: "Brown Butter Sous Vide Scrambled Eggs",
  added: "2026-07",
  servings: "2",
  ingredients: [
    { id: "eggs", label: "6 eggs" },
    { id: "milk", label: "4 tsp whole milk" },
    { id: "cream", label: "4 tsp heavy cream" },
    { id: "butter", label: "25 g butter" },
  ],
  steps: [
    "Heat sous vide to 75°C.",
    "Brown the butter in a pan until dark brown. Set aside.",
    "Whisk eggs, milk, and cream well, then mix in the brown butter.",
    "Vacuum seal and cook for 16 minutes. Take the bag out 2–3 times and squash a bit to get an even cook.",
    "Eat.",
  ],
  notes: [
    "If ingredients are cold, wait until warm enough not to chill the butter too much.",
  ],
  sources: [
    {
      label: "Based on Heston Blumenthal's recipe, via bigspud.co.uk",
      url: "https://bigspud.co.uk/heston-blumenthals-sous-vide-scrambled-eggs/",
    },
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
