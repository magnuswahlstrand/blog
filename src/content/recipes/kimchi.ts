import type { RecipeFlow } from "../../lib/recipe-flow/schema";

export const kimchi: RecipeFlow = {
  title: "Kimchi",
  servings: "about 500 g",
  ingredients: [
    { id: "cabbage", label: "1/2 napa cabbage" },
    { id: "salt", label: "2 tbsp salt" },
    { id: "apple", label: "1/2 apple" },
    { id: "garlic", label: "1 garlic clove" },
    { id: "paprika", label: "1 tbsp paprika powder" },
    { id: "chili-flakes", label: "1 tbsp chili flakes" },
    { id: "sugar", label: "2 tbsp sugar" },
  ],
  operations: [
    {
      id: "mix-rest-cabbage",
      label: "Mix, rest overnight",
      inputs: ["cabbage", "salt"],
    },
    { id: "grate-apple", label: "Grate", inputs: ["apple"] },
    { id: "mince-garlic", label: "Mince", inputs: ["garlic"] },
    {
      id: "mix-aromatics-spices",
      label: "Mix",
      inputs: [
        "grate-apple",
        "mince-garlic",
        "paprika",
        "chili-flakes",
        "sugar",
      ],
    },
    {
      id: "combine",
      label: "Mix",
      inputs: ["mix-rest-cabbage", "mix-aromatics-spices"],
    },
  ],
};
