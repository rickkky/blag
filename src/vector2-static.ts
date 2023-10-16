import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';
import { VectorArgs } from './vector-base';
import { createVecPrototype } from './vector-static';
import { Vector2 } from './vector2';

export interface CreateVector2 {
  (): Vector2;
  (x: number, y: number): Vector2;
  (nums: number[]): Vector2;
  (v: Vector2): Vector2;
  (...args: VectorArgs): Vector2;
}

const createVector2: CreateVector2 = (...args: VectorArgs) => {
  return new Vector2(...args);
};

const Vec2Prototype = {
  ...createVecPrototype<Vector2, Matrix2 | Matrix3>(Vector2),
};

export const vec2 = Object.assign(createVector2, Vec2Prototype);
