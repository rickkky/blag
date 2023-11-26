import { Vector3 } from './vector3';
import { Vector4 } from './vector4';
import { MatrixArgs } from './matrix-prototype';
import { Matrix3 } from './matrix3';
import { Matrix4Base } from './matrix4-base';
import { createMatrix4Prototype } from './matrix4-prototype';
import { BoundingBox } from './constant';

const prototype = createMatrix4Prototype();

export class Matrix4 extends Matrix4Base<Vector4> {
  constructor();
  constructor(...nums: number[]);
  constructor(nums: number[]);
  constructor(nums: number[][]);
  constructor(v0: Vector4, v1: Vector4, v2: Vector4, v3: Vector4);
  constructor(vecs: Vector4[]);
  constructor(m: Matrix4);
  constructor(...args: MatrixArgs);
  constructor(...args: MatrixArgs) {
    super();
    prototype.set(this, ...args);
  }

  get dimension(): 4 {
    return 4;
  }

  _sub(row: number, col: number) {
    const vecs = this.toColMajorArray2D();
    vecs.splice(row, 1);
    for (const v of vecs) {
      v.splice(col, 1);
    }
    return new Matrix3(vecs);
  }

  set(): Matrix4;
  set(...nums: number[]): Matrix4;
  set(nums: number[]): Matrix4;
  set(nums: number[][]): Matrix4;
  set(v0: Vector4, v1: Vector4, v2: Vector4, v3: Vector4): Matrix4;
  set(vecs: Vector4[]): Matrix4;
  set(m: Matrix4): Matrix4;
  set(...args: MatrixArgs): Matrix4;
  set(...args: MatrixArgs) {
    return prototype.set(this, ...args);
  }

  clone(target?: Matrix4): Matrix4 {
    return prototype.clone(this, target);
  }

  equals(m: Matrix4, precision?: number): boolean {
    return prototype.equals(this, m, precision);
  }

  multiplyScalar(s: number, target: Matrix4 = this): Matrix4 {
    return prototype.multiplyScalar(this, s, target);
  }

  multiply(m: Matrix4, target: Matrix4 = this): Matrix4 {
    return prototype.multiply(this, m, target);
  }

  multiplication(mats: Matrix4[], target: Matrix4 = this): Matrix4 {
    return prototype.multiplication(mats, target);
  }

  transpose(target: Matrix4 = this): Matrix4 {
    return prototype.transpose(this, target);
  }

  minor(row: number, col: number): number {
    return prototype.minor(this, row, col);
  }

  cofactor(row: number, col: number): number {
    return prototype.cofactor(this, row, col);
  }

  determinant(): number {
    return prototype.determinant(this);
  }

  invert(target: Matrix4 = this): Matrix4 {
    return prototype.invert(this, target);
  }

  identity(): Matrix4 {
    return prototype.identity(this);
  }

  toArray(): number[] {
    return prototype.toArray(this);
  }

  translation(
    tx: number,
    ty: number,
    tz: number,
    target: Matrix4 = this,
  ): Matrix4 {
    return prototype.translation(tx, ty, tz, target);
  }

  scaling(sx: number, sy: number, sz: number, target: Matrix4 = this): Matrix4 {
    return prototype.scaling(sx, sy, sz, target);
  }

  rotationX(angle: number, target: Matrix4 = this): Matrix4 {
    return prototype.rotationX(angle, target);
  }

  rotationY(angle: number, target: Matrix4 = this): Matrix4 {
    return prototype.rotationY(angle, target);
  }

  rotationZ(angle: number, target: Matrix4 = this): Matrix4 {
    return prototype.rotationZ(angle, target);
  }

  rotation(
    angleX: number,
    angleY: number,
    angleZ: number,
    target: Matrix4 = this,
  ): Matrix4 {
    return prototype.rotation(angleX, angleY, angleZ, target);
  }

  orthographic(
    view: BoundingBox,
    clip?: BoundingBox,
    target: Matrix4 = this,
  ): Matrix4 {
    return prototype.orthographic(view, clip, target);
  }

  perspective(
    fov: number,
    aspect: number,
    near: number,
    far: number,
    clip?: BoundingBox,
    target: Matrix4 = this,
  ): Matrix4 {
    return prototype.perspective(fov, aspect, near, far, clip, target);
  }

  targetTo(eye: Vector3, aim: Vector3, up: Vector3, target: Matrix4 = this) {
    return prototype.targetTo(eye, aim, up, target);
  }

  lookAt(eye: Vector3, aim: Vector3, up: Vector3, target: Matrix4 = this) {
    return prototype.lookAt(eye, aim, up, target);
  }

  toColMajorArray(): number[] {
    return prototype.toColMajorArray(this);
  }

  toRowMajorArray(): number[] {
    return prototype.toRowMajorArray(this);
  }

  toArray2D(): number[][] {
    return prototype.toArray2D(this);
  }

  toColMajorArray2D(): number[][] {
    return prototype.toColMajorArray2D(this);
  }

  toRowMajorArray2D(): number[][] {
    return prototype.toRowMajorArray2D(this);
  }
}

export interface CreateMatrix4 {
  (): Matrix4;
  (...nums: number[]): Matrix4;
  (nums: number[]): Matrix4;
  (nums: number[][]): Matrix4;
  (v0: Vector4, v1: Vector4, v2: Vector4, v3: Vector4): Matrix4;
  (vecs: Vector4[]): Matrix4;
  (m: Matrix4): Matrix4;
  (...args: MatrixArgs): Matrix4;
}

const createMatrix4: CreateMatrix4 = (...args: MatrixArgs) => {
  return new Matrix4(...args);
};

export const mat4 = Object.assign(createMatrix4, prototype);
