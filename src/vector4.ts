import { VectorArgs } from './vector-base';
import { createVectorStatics } from './vector-static';
import { Vector2 } from './vector2';
import { Vector3 } from './vector3';
import { Vector4Base } from './vector4-base';
import { Matrix4 } from './matrix4';

export class Vector4 extends Vector4Base {
  constructor();
  constructor(x: number, y: number, z: number, w: number);
  constructor(list: number[]);
  constructor(v: Vector4);
  constructor(xyz: Vector3, w: number);
  constructor(x: number, yzw: Vector3);
  constructor(xy: Vector2, zw: Vector2);
  constructor(xy: Vector2, z: number, w: number);
  constructor(x: number, yz: Vector2, w: number);
  constructor(x: number, y: number, zw: Vector2);
  constructor(...args: VectorArgs);
  constructor(...args: VectorArgs) {
    super(...args);
  }

  get dimension(): 4 {
    return 4;
  }

  set(): this;
  set(x: number, y: number, z: number, w: number): this;
  set(list: number[]): this;
  set(v: Vector4): this;
  set(xyz: Vector3, w: number): this;
  set(x: number, yzw: Vector3): this;
  set(xy: Vector2, zw: Vector2): this;
  set(xy: Vector2, z: number, w: number): this;
  set(x: number, yz: Vector2, w: number): this;
  set(x: number, y: number, zw: Vector2): this;
  set(...args: VectorArgs): this;
  set(...args: VectorArgs) {
    return super.set(...args);
  }

  transform(m: Matrix4, target?: this) {
    return super.transform(m, target);
  }
}

interface Vec4
  extends ReturnType<typeof createVectorStatics<Vector4, Matrix4>> {
  (): Vector4;
  (x: number, y: number, z: number, w: number): Vector4;
  (list: number[]): Vector4;
  (v: Vector4): Vector4;
  (xyz: Vector3, w: number): Vector4;
  (x: number, yzw: Vector3): Vector4;
  (xy: Vector2, zw: Vector2): Vector4;
  (xy: Vector2, z: number, w: number): Vector4;
  (x: number, yz: Vector2, w: number): Vector4;
  (x: number, y: number, zw: Vector2): Vector4;
  (...args: VectorArgs): Vector4;
}

const _vec4 = (...args: VectorArgs) => new Vector4(...args);

export const vec4: Vec4 = Object.assign(
  _vec4,
  createVectorStatics<Vector4, Matrix4>(Vector4),
);
