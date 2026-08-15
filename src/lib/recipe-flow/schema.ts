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

export const recipeImageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
});

export const recipeSourceSchema = z.object({
  label: z.string(),
  url: z.string(),
});

export const recipeFlowSchema = z.object({
  title: z.string(),
  servings: z.string().optional(),
  ingredients: z.array(ingredientSchema),
  operations: z.array(operationSchema),
  steps: z.array(z.string()).optional(),
  notes: z.array(z.string()).optional(),
  sources: z.array(recipeSourceSchema).optional(),
  images: z.array(recipeImageSchema).optional(),
});

export type RecipeFlow = z.infer<typeof recipeFlowSchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;
export type Operation = z.infer<typeof operationSchema>;
export type RecipeImage = z.infer<typeof recipeImageSchema>;
export type RecipeSource = z.infer<typeof recipeSourceSchema>;
