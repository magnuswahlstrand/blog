import type { RecipeFlow } from "../../lib/recipe-flow/schema";

export const kimchi: RecipeFlow = {
  title: "Kimchi",
  added: 2026,
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
  steps: [
    "Mix the cabbage with the salt",
    "Let sit overnight",
    "Grate the apple and mince the garlic",
    "Mix in paprika powder, chili flakes, and sugar",
    "Combine everything with the cabbage",
  ],
  images: [
    { src: "/img/recipes/kimchi/1.jpeg", alt: "Half napa cabbage" },
    { src: "/img/recipes/kimchi/2.jpeg", alt: "Cabbage sliced into rounds" },
    { src: "/img/recipes/kimchi/3.jpeg", alt: "Chopped cabbage in bowl" },
    {
      src: "/img/recipes/kimchi/4.jpeg",
      alt: "Cabbage after salting overnight",
    },
    { src: "/img/recipes/kimchi/5.jpeg", alt: "Preparing the apple" },
    { src: "/img/recipes/kimchi/6.jpeg", alt: "Apple mixed in" },
    { src: "/img/recipes/kimchi/7.jpeg", alt: "Spices added" },
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
