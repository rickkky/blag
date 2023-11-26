import { Vector2 } from './vector2';
import { createMatrixPrototype } from './matrix-prototype';
import { Matrix2 } from './matrix2';

export function createMatrix2Prototype() {
  const createVector = () => new Vector2();
  const createMatrix = () => new Matrix2();
  const prototype = createMatrixPrototype(createVector, createMatrix);

  return {
    ...prototype,
  };
}
