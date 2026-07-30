import type { RecipeFlow } from "./schema";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function validateRecipeFlow(recipe: RecipeFlow): void {
  const ingredientIds = new Set(recipe.ingredients.map(i => i.id));
  const operationIds = new Set(recipe.operations.map(o => o.id));
  const allIds = new Set([...ingredientIds, ...operationIds]);

  // Duplicate IDs
  const ids = recipe.ingredients.map(i => i.id);
  for (const op of recipe.operations) {
    ids.push(op.id);
  }
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) {
      throw new ValidationError(`Duplicate ID: "${id}"`);
    }
    seen.add(id);
  }

  // Operations must have at least one input
  for (const op of recipe.operations) {
    if (op.inputs.length === 0) {
      throw new ValidationError(`Operation "${op.id}" has no inputs`);
    }
  }

  // All input references must exist
  for (const op of recipe.operations) {
    for (const input of op.inputs) {
      if (!allIds.has(input)) {
        throw new ValidationError(
          `Operation "${op.id}" references unknown input "${input}"`
        );
      }
    }
  }

  // Circular dependency detection (DFS)
  const adjacency = new Map<string, string[]>();
  for (const op of recipe.operations) {
    adjacency.set(
      op.id,
      op.inputs.filter(i => operationIds.has(i))
    );
  }

  const visited = new Set<string>();
  const inStack = new Set<string>();

  function dfs(node: string): void {
    visited.add(node);
    inStack.add(node);
    const neighbors = adjacency.get(node) ?? [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      } else if (inStack.has(neighbor)) {
        throw new ValidationError(
          `Circular dependency detected involving operation "${node}"`
        );
      }
    }
    inStack.delete(node);
  }

  for (const op of recipe.operations) {
    if (!visited.has(op.id)) {
      dfs(op.id);
    }
  }

  // Explicit stages must not violate dependency order
  for (const op of recipe.operations) {
    if (op.stage !== undefined) {
      for (const input of op.inputs) {
        const inputOp = recipe.operations.find(o => o.id === input);
        if (inputOp && inputOp.stage !== undefined) {
          if (op.stage <= inputOp.stage) {
            throw new ValidationError(
              `Operation "${op.id}" has stage ${op.stage} which is not greater than its input "${input}" stage ${inputOp.stage}`
            );
          }
        }
      }
    }
  }
}
