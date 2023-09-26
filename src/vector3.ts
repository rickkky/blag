import { VectorArgs } from './vector-base';
import { createVectorStatics } from './vector-static';
import { Vector2 } from './vector2';
import { Vector3Base } from './vector3-base';
import { MatrixBase } from './matrix-base';
import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';

export class Vector3 extends Vector3Base {
  constructor();
  constructor(x: number, y: number, z: number);
  constructor(list: number[]);
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
  set(list: number[]): this;
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

  cross(v: this, target: this = this) {
    const [x0, y0, z0] = target;
    const [x1, y1, z1] = v;
    target[0] = y0 * z1 - z0 * y1;
    target[1] = z0 * x1 - x0 * z1;
    target[2] = x0 * y1 - y0 * x1;
    return target;
  }
}

function createVector3Statics<V extends Vector3, TM extends MatrixBase<any>>(
  Vector: new () => V,
) {
  return {
    ...createVectorStatics<V, TM>(Vector),

    cross(v0: V, v1: V, target = new Vector()) {
      return target.set(v0).cross(v1);
    },
  };
}

interface Vec3
  extends ReturnType<typeof createVector3Statics<Vector3, Matrix3 | Matrix4>> {
  (): Vector3;
  (x: number, y: number, z: number): Vector3;
  (list: number[]): Vector3;
  (v: Vector3): Vector3;
  (xy: Vector2, z: number): Vector3;
  (x: number, yz: Vector2): Vector3;
  (...args: VectorArgs): Vector3;
}

const _vec3 = (...args: VectorArgs) => new Vector3(...args);

export const vec3: Vec3 = Object.assign(
  _vec3,
  createVector3Statics<Vector3, Matrix3 | Matrix4>(Vector3),
);
