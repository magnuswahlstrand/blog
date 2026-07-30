import { describe, it, expect } from "vitest";
import { validateRecipeFlow, ValidationError } from "../validate";
import type { RecipeFlow } from "../schema";

const validRecipe: RecipeFlow = {
  title: "Test",
  ingredients: [{ id: "a", label: "A" }],
  operations: [{ id: "op1", label: "Do", inputs: ["a"] }],
};

describe("validateRecipeFlow", () => {
  it("accepts valid recipe", () => {
    expect(() => validateRecipeFlow(validRecipe)).not.toThrow();
  });

  it("rejects duplicate IDs", () => {
    const recipe: RecipeFlow = {
      title: "Bad",
      ingredients: [
        { id: "a", label: "A" },
        { id: "a", label: "B" },
      ],
      operations: [],
    };
    expect(() => validateRecipeFlow(recipe)).toThrow(ValidationError);
  });

  it("rejects duplicate ID across ingredients and operations", () => {
    const recipe: RecipeFlow = {
      title: "Bad",
      ingredients: [{ id: "a", label: "A" }],
      operations: [{ id: "a", label: "Op", inputs: ["a"] }],
    };
    expect(() => validateRecipeFlow(recipe)).toThrow(ValidationError);
  });

  it("rejects unknown input reference", () => {
    const recipe: RecipeFlow = {
      title: "Bad",
      ingredients: [{ id: "a", label: "A" }],
      operations: [{ id: "op1", label: "Do", inputs: ["nonexistent"] }],
    };
    expect(() => validateRecipeFlow(recipe)).toThrow(ValidationError);
  });

  it("rejects operation with no inputs", () => {
    const recipe: RecipeFlow = {
      title: "Bad",
      ingredients: [],
      operations: [{ id: "op1", label: "Do", inputs: [] }],
    };
    expect(() => validateRecipeFlow(recipe)).toThrow(ValidationError);
  });

  it("rejects circular dependency", () => {
    const recipe: RecipeFlow = {
      title: "Circle",
      ingredients: [],
      operations: [
        { id: "a", label: "A", inputs: ["b"] },
        { id: "b", label: "B", inputs: ["c"] },
        { id: "c", label: "C", inputs: ["a"] },
      ],
    };
    expect(() => validateRecipeFlow(recipe)).toThrow(ValidationError);
  });

  it("rejects direct self-loop", () => {
    const recipe: RecipeFlow = {
      title: "Self",
      ingredients: [],
      operations: [{ id: "a", label: "A", inputs: ["a"] }],
    };
    expect(() => validateRecipeFlow(recipe)).toThrow(ValidationError);
  });

  it("rejects explicit stage that violates dependency order", () => {
    const recipe: RecipeFlow = {
      title: "Bad stages",
      ingredients: [{ id: "a", label: "A" }],
      operations: [
        { id: "op1", label: "First", inputs: ["a"], stage: 2 },
        { id: "op2", label: "Second", inputs: ["op1"], stage: 1 },
      ],
    };
    expect(() => validateRecipeFlow(recipe)).toThrow(ValidationError);
  });

  it("accepts valid explicit stage override", () => {
    const recipe: RecipeFlow = {
      title: "Good stages",
      ingredients: [{ id: "a", label: "A" }],
      operations: [
        { id: "op1", label: "First", inputs: ["a"], stage: 2 },
        { id: "op2", label: "Second", inputs: ["op1"], stage: 5 },
      ],
    };
    expect(() => validateRecipeFlow(recipe)).not.toThrow();
  });
});
