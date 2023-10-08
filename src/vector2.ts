import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';
import { VectorArgs } from './vector-base';
import { createVectorStatics } from './vector-static';
import { Vector2Base } from './vector2-base';

export class Vector2 extends Vector2Base {
  constructor();
  constructor(x: number, y: number);
  constructor(nums: number[]);
  constructor(v: Vector2);
  constructor(...args: VectorArgs);
  constructor(...args: VectorArgs) {
    super(...args);
  }

  get dimension(): 2 {
    return 2;
  }

  set(): this;
  set(x: number, y: number): this;
  set(nums: number[]): this;
  set(v: Vector2): this;
  set(...args: VectorArgs): this;
  set(...args: VectorArgs) {
    return super.set(...args);
  }

  transform(m: Matrix2 | Matrix3, target?: this) {
    return super.transform(m, target);
  }
}

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

export const vec2 = Object.assign(
  createVector2,
  createVectorStatics<Vector2, Matrix2 | Matrix3>(Vector2),
);
