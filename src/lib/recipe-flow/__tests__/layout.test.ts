import { describe, it, expect } from "vitest";
import { layoutRecipeFlow } from "../layout";
import type { RecipeFlow } from "../schema";

const singleChain: RecipeFlow = {
  title: "Single chain",
  ingredients: [
    { id: "a", label: "A" },
    { id: "b", label: "B" },
  ],
  operations: [
    { id: "op1", label: "Step 1", inputs: ["a", "b"] },
    { id: "op2", label: "Step 2", inputs: ["op1"] },
    { id: "op3", label: "Step 3", inputs: ["op2"] },
  ],
};

const parallelBranches: RecipeFlow = {
  title: "Parallel",
  ingredients: [
    { id: "a", label: "A" },
    { id: "b", label: "B" },
    { id: "c", label: "C" },
    { id: "d", label: "D" },
  ],
  operations: [
    { id: "op1", label: "Branch 1", inputs: ["a"] },
    { id: "op2", label: "Branch 2", inputs: ["b", "c"] },
    { id: "op3", label: "Branch 3", inputs: ["d"] },
  ],
};

const mergeOp: RecipeFlow = {
  title: "Merge",
  ingredients: [
    { id: "a", label: "A" },
    { id: "b", label: "B" },
    { id: "c", label: "C" },
  ],
  operations: [
    { id: "op1", label: "First", inputs: ["a"] },
    { id: "op2", label: "Second", inputs: ["b", "c"] },
    { id: "op3", label: "Merge", inputs: ["op1", "op2"] },
  ],
};

const spanningNonAdjacent: RecipeFlow = {
  title: "Spanning",
  ingredients: [
    { id: "a", label: "A" },
    { id: "b", label: "B" },
    { id: "c", label: "C" },
    { id: "d", label: "D" },
    { id: "e", label: "E" },
  ],
  operations: [
    { id: "op1", label: "Span A-C", inputs: ["a", "c"] },
    { id: "op2", label: "Span D-E", inputs: ["d", "e"] },
    { id: "op3", label: "Merge all", inputs: ["op1", "op2"] },
  ],
};

describe("layoutRecipeFlow", () => {
  it("single linear chain", () => {
    const layout = layoutRecipeFlow(singleChain);
    expect(layout.width).toBeGreaterThan(0);
    expect(layout.height).toBeGreaterThan(0);

    const opCells = layout.cells.filter(c => c.type === "operation");
    expect(opCells).toHaveLength(3);

    // op1 at stage 1, rows 0-1
    const op1 = opCells.find(c => c.id === "op1")!;
    expect(op1.x).toBe(layout.ingredientWidth);
    expect(op1.y).toBe(layout.headerHeight);
    expect(op1.width).toBe(layout.operationWidth);
    expect(op1.height).toBe(2 * layout.rowHeight);

    // op2 at stage 2, rows 0-1
    const op2 = opCells.find(c => c.id === "op2")!;
    expect(op2.x).toBe(layout.ingredientWidth + layout.operationWidth);
    expect(op2.y).toBe(layout.headerHeight);
    expect(op2.height).toBe(2 * layout.rowHeight);

    // op3 at stage 3, rows 0-1
    const op3 = opCells.find(c => c.id === "op3")!;
    expect(op3.x).toBe(layout.ingredientWidth + 2 * layout.operationWidth);
    expect(op3.y).toBe(layout.headerHeight);
    expect(op3.height).toBe(2 * layout.rowHeight);
  });

  it("parallel branches have same stage", () => {
    const layout = layoutRecipeFlow(parallelBranches);
    const opCells = layout.cells.filter(c => c.type === "operation");

    // All three ops are at stage 1 (directly consume ingredients)
    for (const op of opCells) {
      expect(op.x).toBe(layout.ingredientWidth);
    }
  });

  it("merge operation spans total row range", () => {
    const layout = layoutRecipeFlow(mergeOp);
    const opCells = layout.cells.filter(c => c.type === "operation");

    const merge = opCells.find(c => c.id === "op3")!;
    // op1 consumes row 0, op2 consumes rows 1-2
    // merge should span rows 0-2
    expect(merge.height).toBe(3 * layout.rowHeight);
  });

  it("operation spanning non-adjacent rows", () => {
    const layout = layoutRecipeFlow(spanningNonAdjacent);
    const opCells = layout.cells.filter(c => c.type === "operation");

    const span = opCells.find(c => c.id === "op1")!;
    // op1 inputs "a" (row 0) and "c" (row 2)
    // should span rows 0-2
    expect(span.height).toBe(3 * layout.rowHeight);
  });

  it("produces deterministic output", () => {
    const layout1 = layoutRecipeFlow(singleChain);
    const layout2 = layoutRecipeFlow(singleChain);
    expect(layout1).toEqual(layout2);
  });

  it("ingredient cells match ingredient order", () => {
    const layout = layoutRecipeFlow(singleChain);
    const ingCells = layout.cells.filter(c => c.type === "ingredient");
    expect(ingCells).toHaveLength(2);
    expect(ingCells[0].id).toBe("a");
    expect(ingCells[1].id).toBe("b");
  });
});
