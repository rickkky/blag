import { Matrix3 } from './matrix3-class';
import { Matrix4 } from './matrix4-class';
import { VectorArgs } from './vector-base';
import { Vector2 } from './vector2-class';
import { Vector3Base } from './vector3-base';

export class Vector3 extends Vector3Base {
  constructor();
  constructor(x: number, y: number, z: number);
  constructor(nums: number[]);
  constructor(v: Vector3);
  constructor(xy: Vector2, z: number);
  constructor(x: number, yz: Vector2);
  constructor(...args: VectorArgs);
  constructor(...args: VectorArgs) {
    super(...args);
  }

  get dimension(): 3 {
    return 3;
  }

  set(): this;
  set(x: number, y: number, z: number): this;
  set(nums: number[]): this;
  set(v: Vector3): this;
  set(xy: Vector2, z: number): this;
  set(x: number, yz: Vector2): this;
  set(...args: VectorArgs): this;
  set(...args: VectorArgs) {
    return super.set(...args);
  }

  transform(m: Matrix3 | Matrix4, target?: this) {
    return super.transform(m, target);
  }

  cross(v: this, target = this) {
    if (target !== this) {
      target.set(this);
    }
    const [x0, y0, z0] = target;
    const [x1, y1, z1] = v;
    target[0] = y0 * z1 - z0 * y1;
    target[1] = z0 * x1 - x0 * z1;
    target[2] = x0 * y1 - y0 * x1;
    return target;
  }
}
