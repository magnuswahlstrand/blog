import { describe, it, expect } from "vitest";
import { postSchema } from "../schema";

describe("postSchema", () => {
  it("accepts a post with only the required fields", () => {
    const result = postSchema.safeParse({
      title: "2D animation: Transitions",
      datetime: new Date("2019-04-28"),
      tags: ["go", "ebiten"],
    });
    expect(result.success).toBe(true);
  });

  it("accepts a Date datetime, as YAML produces for unquoted dates", () => {
    const result = postSchema.safeParse({
      title: "A post",
      datetime: new Date("2019-04-28"),
      tags: [],
    });
    expect(result.success).toBe(true);
  });

  it("accepts a string datetime, as YAML produces for quoted dates", () => {
    const result = postSchema.safeParse({
      title: "A post",
      datetime: "2019-04-28",
      tags: [],
    });
    expect(result.success).toBe(true);
  });

  it("allows an omitted slug, which falls back to the title", () => {
    const result = postSchema.safeParse({
      title: "A post",
      datetime: "2019-04-28",
      tags: [],
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.slug).toBeUndefined();
  });

  it("defaults missing tags to an empty array", () => {
    const result = postSchema.safeParse({
      title: "A post",
      datetime: "2019-04-28",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.tags).toEqual([]);
  });

  it("rejects a missing title", () => {
    const result = postSchema.safeParse({ datetime: "2019-04-28", tags: [] });
    expect(result.success).toBe(false);
  });

  it("rejects a missing datetime", () => {
    const result = postSchema.safeParse({ title: "A post", tags: [] });
    expect(result.success).toBe(false);
  });

  it("rejects a numeric datetime, which would sort wrong", () => {
    const result = postSchema.safeParse({
      title: "A post",
      datetime: 20190428,
      tags: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects tags that are not strings", () => {
    const result = postSchema.safeParse({
      title: "A post",
      datetime: "2019-04-28",
      tags: [1, 2],
    });
    expect(result.success).toBe(false);
  });
});
