import type { RecipeFlow, Operation, Ingredient } from "./schema";

export interface LayoutRect {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  type: "ingredient" | "operation";
  lines: number;
}

export interface RecipeLayout {
  width: number;
  height: number;
  ingredientWidth: number;
  operationWidth: number;
  rowHeight: number;
  headerHeight: number;
  cells: LayoutRect[];
}

export interface NodeStage {
  startRow: number;
  endRow: number;
  stage: number;
}

export const INGREDIENT_WIDTH = 180;
export const OPERATION_WIDTH = 130;
export const ROW_HEIGHT = 48;
export const HEADER_HEIGHT = 48;

function getNodeStage(
  id: string,
  operations: Operation[],
  ingredients: Ingredient[],
  stageCache: Map<string, number>
): number {
  const cached = stageCache.get(id);
  if (cached !== undefined) return cached;

  const ingredientIndex = ingredients.findIndex(i => i.id === id);
  if (ingredientIndex !== -1) {
    stageCache.set(id, 0);
    return 0;
  }

  const op = operations.find(o => o.id === id);
  if (!op) return 0;

  if (op.stage !== undefined) {
    stageCache.set(id, op.stage);
    return op.stage;
  }

  let maxInputStage = 0;
  for (const input of op.inputs) {
    const inputStage = getNodeStage(input, operations, ingredients, stageCache);
    maxInputStage = Math.max(maxInputStage, inputStage);
  }

  const stage = maxInputStage + 1;
  stageCache.set(id, stage);
  return stage;
}

function getRowRange(
  id: string,
  operations: Operation[],
  ingredients: Ingredient[],
  rowCache: Map<string, { startRow: number; endRow: number }>,
  nodeStages: Map<string, number>
): { startRow: number; endRow: number } {
  const cached = rowCache.get(id);
  if (cached !== undefined) return cached;

  const ingredientIndex = ingredients.findIndex(i => i.id === id);
  if (ingredientIndex !== -1) {
    const result = { startRow: ingredientIndex, endRow: ingredientIndex };
    rowCache.set(id, result);
    return result;
  }

  const op = operations.find(o => o.id === id);
  if (!op) return { startRow: 0, endRow: 0 };

  let minRow = Infinity;
  let maxRow = -Infinity;

  for (const input of op.inputs) {
    const range = getRowRange(
      input,
      operations,
      ingredients,
      rowCache,
      nodeStages
    );
    minRow = Math.min(minRow, range.startRow);
    maxRow = Math.max(maxRow, range.endRow);
  }

  const result = { startRow: minRow, endRow: maxRow };
  rowCache.set(id, result);
  return result;
}

export function layoutRecipeFlow(recipe: RecipeFlow): RecipeLayout {
  const { ingredients, operations } = recipe;

  // Compute stages
  const stageCache = new Map<string, number>();
  const nodeStages = new Map<string, number>();
  for (const op of operations) {
    const stage = getNodeStage(op.id, operations, ingredients, stageCache);
    nodeStages.set(op.id, stage);
  }

  // Compute row ranges
  const rowCache = new Map<string, { startRow: number; endRow: number }>();
  const nodeRows = new Map<string, { startRow: number; endRow: number }>();
  for (const op of operations) {
    const range = getRowRange(
      op.id,
      operations,
      ingredients,
      rowCache,
      nodeStages
    );
    nodeRows.set(op.id, range);
  }

  // Determine max stage
  let maxStage = 0;
  for (const [, stage] of nodeStages) {
    maxStage = Math.max(maxStage, stage);
  }

  const numRows = ingredients.length;
  const totalWidth = INGREDIENT_WIDTH + maxStage * OPERATION_WIDTH;
  const totalHeight = HEADER_HEIGHT + numRows * ROW_HEIGHT;

  const cells: LayoutRect[] = [];

  // Ingredient cells
  for (let i = 0; i < ingredients.length; i++) {
    cells.push({
      id: ingredients[i].id,
      x: 0,
      y: HEADER_HEIGHT + i * ROW_HEIGHT,
      width: INGREDIENT_WIDTH,
      height: ROW_HEIGHT,
      label: ingredients[i].label,
      type: "ingredient",
      lines: 1,
    });
  }

  // Operation cells
  for (const op of operations) {
    const stage = nodeStages.get(op.id) ?? 1;
    const range = nodeRows.get(op.id) ?? { startRow: 0, endRow: 0 };

    cells.push({
      id: op.id,
      x: INGREDIENT_WIDTH + (stage - 1) * OPERATION_WIDTH,
      y: HEADER_HEIGHT + range.startRow * ROW_HEIGHT,
      width: OPERATION_WIDTH,
      height: (range.endRow - range.startRow + 1) * ROW_HEIGHT,
      label: op.label,
      type: "operation",
      lines: Math.ceil(op.label.length / 15),
    });
  }

  return {
    width: totalWidth,
    height: totalHeight,
    ingredientWidth: INGREDIENT_WIDTH,
    operationWidth: OPERATION_WIDTH,
    rowHeight: ROW_HEIGHT,
    headerHeight: HEADER_HEIGHT,
    cells,
  };
}
