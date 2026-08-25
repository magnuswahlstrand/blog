import type { RecipeFlow } from "../../lib/recipe-flow/schema";

export const chickpeaSalad: RecipeFlow = {
  title: "5-Minute Chickpea Salad",
  added: 2026,
  ingredients: [
    { id: "chickpeas", label: "1 can chickpeas, rinsed" },
    { id: "cucumber", label: "½ cucumber, diced" },
    { id: "tomatoes", label: "2 tomatoes, diced" },
    { id: "red-onion", label: "½ red onion, thinly sliced" },
    { id: "feta", label: "Feta cheese" },
    { id: "herbs", label: "Parsley or mint" },
    { id: "olive-oil", label: "2 tbsp olive oil" },
    { id: "lemon", label: "1 tbsp lemon" },
    { id: "cumin", label: "½ tsp cumin" },
    { id: "salt", label: "Salt" },
    { id: "pepper", label: "Black pepper" },
    { id: "toppings", label: "Sumac or chili flakes (optional)" },
  ],
  steps: [
    "Mix the dressing: olive oil, lemon, cumin, salt, and black pepper.",
    "Toss the chickpeas, cucumber, tomatoes, and red onion with the dressing.",
    "Add feta cheese and parsley or mint.",
    "Top with sumac or a little chili flakes if you have it.",
  ],
  operations: [
    {
      id: "mix-dressing",
      label: "Mix",
      inputs: ["olive-oil", "lemon", "cumin", "salt", "pepper"],
    },
    {
      id: "toss",
      label: "Toss",
      inputs: [
        "chickpeas",
        "cucumber",
        "tomatoes",
        "red-onion",
        "mix-dressing",
      ],
    },
    {
      id: "finish",
      label: "Add feta and herbs",
      inputs: ["toss", "feta", "herbs"],
    },
    {
      id: "top",
      label: "Top with sumac or chili flakes",
      inputs: ["finish", "toppings"],
    },
  ],
};
