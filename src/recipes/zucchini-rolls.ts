import type { RecipeFlow } from "../../lib/recipe-flow/schema";

export const zucchiniRolls: RecipeFlow = {
  title: "Zucchini Tapenade Rolls",
  added: 2026,
  servings: "4",
  ingredients: [
    { id: "zucchini", label: "2 zucchini (long, straight)" },
    { id: "tapenade", label: "2–3 tbsp tapenade" },
    { id: "cream-cheese", label: "100 g cream cheese or chèvre" },
    { id: "olive-oil", label: "1 tbsp olive oil" },
    { id: "lemon-zest", label: "Lemon zest" },
    { id: "pepper", label: "Black pepper" },
    { id: "garlic", label: "1 garlic clove" },
    { id: "toothpicks", label: "Toothpicks" },
  ],
  steps: [
    "Mix cream cheese, tapenade, lemon zest, garlic, pepper, and a few drops of olive oil. Let rest if you have time.",
    "Cut zucchini into long thin slices (~2–3 mm).",
    "Cook ribbons in a hot oiled pan, 30–60 sec per side until soft. Salt lightly, cool on paper towel.",
    "Lay each ribbon flat, spread a thin layer of filling, roll tight, and secure with a toothpick.",
  ],
  operations: [
    {
      id: "make-filling",
      label: "Mix",
      inputs: [
        "cream-cheese",
        "tapenade",
        "lemon-zest",
        "pepper",
        "garlic",
        "olive-oil",
      ],
    },
    {
      id: "slice-zucchini",
      label: "Slice thin (~2–3 mm)",
      inputs: ["zucchini"],
    },
    {
      id: "cook-ribbons",
      label: "Cook in hot pan, 30–60 sec/side",
      inputs: ["slice-zucchini"],
    },
    {
      id: "roll",
      label: "Roll and secure with a toothpick",
      inputs: ["cook-ribbons", "make-filling", "toothpicks"],
    },
  ],
};
