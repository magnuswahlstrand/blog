import { z } from "zod";

export const recipeSourceSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

export const recipeImageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
});

export const recipeSchema = z.object({
  title: z.string(),
  // `YYYY-MM`; the recipes table sorts on this string and parses it as a date.
  added: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "added must be YYYY-MM")
    .optional(),
  source: recipeSourceSchema.optional(),
  images: z.array(recipeImageSchema).optional(),
});

export type Recipe = z.infer<typeof recipeSchema>;
export type RecipeSource = z.infer<typeof recipeSourceSchema>;
export type RecipeImage = z.infer<typeof recipeImageSchema>;
