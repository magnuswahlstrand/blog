import type { RecipeFlow } from "../../lib/recipe-flow/schema";

export const kinesiskKrossadGurksallad: RecipeFlow = {
  title: "Kinesisk krossad gurksallad",
  servings: "per 1 frilandsgurka",
  ingredients: [
    { id: "cucumber", label: "1 frilandsgurka" },
    { id: "salt", label: "Lätt salt" },
    { id: "rice-vinegar", label: "1 msk risvinäger" },
    { id: "light-soy", label: "1–2 tsk ljus soja" },
    { id: "sesame-oil", label: "1 tsk sesamolja" },
    { id: "sugar", label: "½–1 tsk socker" },
    { id: "garlic", label: "1 liten riven/pressad vitlöksklyfta" },
    { id: "chili-crisp", label: "Chili crisp/chiliolja efter smak" },
  ],
  steps: [
    "Krossa eller skär gurkan grovt, salta lätt och låt stå 10 min.",
    "Häll av vätskan.",
    "Blanda risvinäger, ljus soja, sesamolja, socker, vitlök och chili crisp/chiliolja.",
    "Rör samman med gurkan.",
  ],
  notes: ["Nästan perfekt till spiskummin-lammet."],
  operations: [
    {
      id: "crack-salt",
      label: "Krossa, salta, stå 10 min",
      inputs: ["cucumber", "salt"],
    },
    {
      id: "drain",
      label: "Häll av vätskan",
      inputs: ["crack-salt"],
    },
    {
      id: "mix-dressing",
      label: "Blanda",
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
      label: "Rör samman",
      inputs: ["drain", "mix-dressing"],
    },
  ],
};
