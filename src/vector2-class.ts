import { Matrix2 } from './matrix2-class';
import { Matrix3 } from './matrix3-class';
import { VectorArgs } from './vector-base';
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
