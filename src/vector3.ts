import { VectorBase, createVectorStatics } from './vector';
import { Vector2, Vector2Base } from './vector2';
import { MatrixBase } from './matrix';
import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';

export abstract class Vector3Base extends Vector2Base {
  get 2() {
    return this._array[2];
  }

  set 2(n: number) {
    this._array[2] = n;
  }

  get z() {
    return this[2];
  }

  set z(n: number) {
    this[2] = n;
  }

  get xz() {
    return new Vector2(this.x, this.z);
  }

  get yz() {
    return new Vector2(this.y, this.z);
  }

  get zx() {
    return new Vector2(this.z, this.x);
  }

  get zy() {
    return new Vector2(this.z, this.y);
  }

  get xyz() {
    return new Vector3(this.x, this.y, this.z);
  }

  get xzy() {
    return new Vector3(this.x, this.z, this.y);
  }

  get yxz() {
    return new Vector3(this.y, this.x, this.z);
  }

  get yzx() {
    return new Vector3(this.y, this.z, this.x);
  }

  get zxy() {
    return new Vector3(this.z, this.x, this.y);
  }

  get zyx() {
    return new Vector3(this.z, this.y, this.x);
  }
}

export class Vector3 extends Vector3Base {
  constructor(x: number, y: number, z: number);
  constructor(list: number[]);
  constructor(v: Vector3);
  constructor(xy: Vector2, z: number);
  constructor(x: number, yz: Vector2);
  constructor(...args: ConstructorParameters<typeof VectorBase>);
  constructor(...args: ConstructorParameters<typeof VectorBase>) {
    super(...args);
  }

  get dimension(): 3 {
    return 3;
  }

  set(x: number, y: number, z: number): this;
  set(list: number[]): this;
  set(v: Vector3): this;
  set(xy: Vector2, z: number): this;
  set(x: number, yz: Vector2): this;
  set(...args: ConstructorParameters<typeof VectorBase>): this;
  set(...args: ConstructorParameters<typeof VectorBase>) {
    return super.set(...args);
  }

  transform(m: Matrix3 | Matrix4, target?: this) {
    return super.transform(m, target);
  }

  cross(v: this, target?: this) {
    if (!target) {
      target = this;
    }
    const [x0, y0, z0] = target;
    const [x1, y1, z1] = v;
    target[0] = y0 * z1 - z0 * y1;
    target[1] = z0 * x1 - x0 * z1;
    target[2] = x0 * y1 - y0 * x1;
    return target;
  }
}

function createVector3Statics<
  V extends Vector3,
  TM extends MatrixBase<VectorBase>,
>(Ctor: new () => V) {
  return {
    ...createVectorStatics<V, TM>(Ctor),

    cross(v0: V, v1: V) {
      return v0.clone().cross(v1);
    },
  };
}

interface Vec3
  extends ReturnType<typeof createVector3Statics<Vector3, Matrix3 | Matrix4>> {
  (x: number, y: number, z: number): Vector3;
  (list: number[]): Vector3;
  (v: Vector3): Vector3;
  (xy: Vector2, z: number): Vector3;
  (x: number, yz: Vector2): Vector3;
  (...args: ConstructorParameters<typeof VectorBase>): Vector3;
}

export const vec3: Vec3 = Object.assign(
  (...args: ConstructorParameters<typeof VectorBase>) => {
    return new Vector3(...args);
  },
  createVector3Statics<Vector3, Matrix3 | Matrix4>(Vector3),
);
