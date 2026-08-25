import type { RecipeFlow } from "../../lib/recipe-flow/schema";

export const xinjiangCuminLamb: RecipeFlow = {
  title: "Xinjiang Cumin Lamb",
  added: "2026-08",
  ingredients: [
    { id: "lamb", label: "700 g lamb stew chunks" },
    { id: "cumin-seeds", label: "2–3 tsp cumin seeds, coarsely crushed" },
    { id: "chili-flakes", label: "1–2 tsp chili flakes" },
    { id: "ground-cumin", label: "1 tsp ground cumin" },
    { id: "garlic", label: "3 garlic cloves" },
    { id: "onion", label: "1 yellow onion" },
    { id: "soy", label: "1–2 tbsp soy sauce" },
    { id: "salt", label: "Salt" },
    { id: "water", label: "~1 dl water or broth" },
    { id: "coriander", label: "Coriander, to finish" },
    { id: "spring-onion", label: "Spring onion, to finish" },
  ],
  steps: [
    "Sear the lamb hard in a hot pot, season lightly with salt.",
    "Sauté onion and garlic with cumin seeds, ground cumin, and chili flakes.",
    "Add soy sauce and about 1 dl water/broth.",
    "Pressure cook 25–30 min on high, then 10 min natural pressure release.",
    "Take out the meat and stir-fry it hard with extra cumin seeds and chili until dry and roasted.",
    "Finish with coriander and spring onion.",
  ],
  notes: [
    "Lamb stew chunks work great here — better than finer cuts for flavour and tender meat.",
    "A pressure cooker is perfect since stew chunks can be tough.",
  ],
  operations: [
    {
      id: "brown-lamb",
      label: "Sear lamb hard",
      inputs: ["lamb", "salt"],
    },
    {
      id: "saute-aromatics",
      label: "Sauté onion, garlic, spices",
      inputs: [
        "onion",
        "garlic",
        "cumin-seeds",
        "ground-cumin",
        "chili-flakes",
      ],
    },
    {
      id: "pressure-cook",
      label: "Pressure cook 25–30 min high + 10 min release",
      inputs: ["brown-lamb", "saute-aromatics", "soy", "water"],
    },
    {
      id: "finish-sear",
      label: "Sear hard with extra cumin + chili",
      inputs: ["pressure-cook", "cumin-seeds", "chili-flakes"],
    },
    {
      id: "garnish",
      label: "Finish with coriander & spring onion",
      inputs: ["finish-sear", "coriander", "spring-onion"],
    },
  ],
};
