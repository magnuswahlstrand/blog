import { z } from "zod";

export const gameStatusSchema = z.enum(["owned", "considering"]);

export const gameSchema = z.object({
  title: z.string(),
  year: z.number().int().min(1900).max(2100),
  status: gameStatusSchema,
  purchased: z.number().int().min(1900).max(2100).optional(),
  bggId: z.number().int().positive().optional(),
  bggRating: z.number().min(0).max(10).optional(),
  tags: z.array(z.string()).default([]),
  note: z.string().optional(),
});

export type Game = z.infer<typeof gameSchema>;
export type GameStatus = z.infer<typeof gameStatusSchema>;
