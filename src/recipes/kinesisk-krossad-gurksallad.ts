import type { RecipeFlow } from "../../lib/recipe-flow/schema";

export const kinesiskKrossadGurksallad: RecipeFlow = {
  title: "Smashed Cucumber Salad",
  servings: "per cucumber",
  ingredients: [
    { id: "cucumber", label: "1 cucumber" },
    { id: "salt", label: "Light salt" },
    { id: "rice-vinegar", label: "1 tbsp rice vinegar" },
    { id: "light-soy", label: "1–2 tsp light soy sauce" },
    { id: "sesame-oil", label: "1 tsp sesame oil" },
    { id: "sugar", label: "½–1 tsp sugar" },
    { id: "garlic", label: "1 small garlic clove, grated or pressed" },
    { id: "chili-crisp", label: "Chili crisp/chili oil to taste" },
  ],
  steps: [
    "Smash or coarsely cut the cucumber, salt lightly, and let sit for 10 min.",
    "Drain off the liquid.",
    "Mix rice vinegar, light soy sauce, sesame oil, sugar, garlic, and chili crisp/chili oil.",
    "Toss with the cucumber.",
  ],
  operations: [
    {
      id: "crack-salt",
      label: "Smash, salt, rest 10 min",
      inputs: ["cucumber", "salt"],
    },
    {
      id: "drain",
      label: "Drain liquid",
      inputs: ["crack-salt"],
    },
    {
      id: "mix-dressing",
      label: "Mix",
      inputs: [
        "rice-vinegar",
        "light-soy",
        "sesame-oil",
        "sugar",
        "garlic",
        "chili-crisp",
      ],
    },
    {
      id: "combine",
      label: "Toss",
      inputs: ["drain", "mix-dressing"],
    },
  ],
};
