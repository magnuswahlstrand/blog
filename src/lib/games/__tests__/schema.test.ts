import { describe, it, expect } from "vitest";
import { gameSchema, gameStatusSchema } from "../schema";

describe("gameSchema", () => {
  it("accepts a valid game", () => {
    const result = gameSchema.safeParse({
      title: "Castle Combo",
      year: 2024,
      players: "2–5",
      status: "owned",
      bggId: 416851,
      bggRating: 7.6,
    });
    expect(result.success).toBe(true);
  });

  it("rejects an unknown status", () => {
    const result = gameStatusSchema.safeParse("wishlist");
    expect(result.success).toBe(false);
  });

  it("rejects a status outside the enum", () => {
    const result = gameSchema.safeParse({
      title: "Castle Combo",
      year: 2024,
      status: "backordered",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing title", () => {
    const result = gameSchema.safeParse({ year: 2024, status: "owned" });
    expect(result.success).toBe(false);
  });

  it("rejects bggRating out of the 0-10 range", () => {
    const result = gameSchema.safeParse({
      title: "Castle Combo",
      year: 2024,
      status: "owned",
      bggRating: 11,
    });
    expect(result.success).toBe(false);
  });
});
