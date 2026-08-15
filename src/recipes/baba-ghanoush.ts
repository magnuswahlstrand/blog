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
  steps: [
    "Heat the oven to 250° C",
    "Poke a few holes in the eggplants (to avoid an explosion in the oven)",
    "Cook the eggplant for 25 minutes",
    "Flip them",
    "Cook for another 25 minutes",
    "Take out and cool (> 30 minutes)",
    "Crush and mince the garlic and put in a large bowl",
    "Add 1 teaspoon of salt and juice of 1/2 lemon",
    "Let it rest for 10 minutes",
    "Cut up the eggplants and scoop out the flesh",
    "Cut it finely into a fine paste",
    "Put the eggplant into the bowl with the lemon and garlic",
    "Add 0.6 dl tahini and 2 tablespoons of olive oil",
    "Let sit for 30 min (only gets better the longer it rests)",
  ],
  notes: ["Prep time: 15 minutes", "Total time: 90 minutes"],
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
