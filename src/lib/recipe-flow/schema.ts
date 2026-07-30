import { z } from "zod";

export const ingredientSchema = z.object({
  id: z.string(),
  label: z.string(),
});

export const operationSchema = z.object({
  id: z.string(),
  label: z.string(),
  inputs: z.array(z.string()),
  stage: z.number().int().nonnegative().optional(),
});

export const recipeFlowSchema = z.object({
  title: z.string(),
  servings: z.string().optional(),
  ingredients: z.array(ingredientSchema),
  operations: z.array(operationSchema),
});

export type RecipeFlow = z.infer<typeof recipeFlowSchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;
export type Operation = z.infer<typeof operationSchema>;
