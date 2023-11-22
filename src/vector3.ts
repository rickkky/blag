import { createVectorPrototype, VectorArgs } from './vector-prototype';
import { Vector2 } from './vector2';
import { Vector3Base } from './vector3-base';
import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';

function createVector3Prototye(create: () => Vector3) {
  function cross(v0: Vector3, v1: Vector3, target = create()) {
    const [x0, y0, z0] = v0;
    const [x1, y1, z1] = v1;
    target[0] = y0 * z1 - z0 * y1;
    target[1] = z0 * x1 - x0 * z1;
    target[2] = x0 * y1 - y0 * x1;
    return target;
  }

  return {
    ...createVectorPrototype<Vector3, Matrix3 | Matrix4>(create),
    cross,
  };
}

const prototype = createVector3Prototye(() => new Vector3());

export class Vector3 extends Vector3Base {
  constructor();
  constructor(x: number, y: number, z: number);
  constructor(nums: number[]);
  constructor(v: Vector3);
  constructor(xy: Vector2, z: number);
  constructor(x: number, yz: Vector2);
  constructor(...args: VectorArgs);
  constructor(...args: VectorArgs) {
    super();
    prototype.set(this, ...args);
  }

  get dimension(): 3 {
    return 3;
  }

  set(): Vector3;
  set(x: number, y: number, z: number): Vector3;
  set(nums: number[]): Vector3;
  set(v: Vector3): Vector3;
  set(xy: Vector2, z: number): Vector3;
  set(x: number, yz: Vector2): Vector3;
  set(...args: VectorArgs): Vector3;
  set(...args: VectorArgs) {
    return prototype.set(this, ...args);
  }

  clone(target?: Vector3): Vector3 {
    return prototype.clone(this, target);
  }

  equals(v: Vector3, precision?: number): boolean {
    return prototype.equals(this, v, precision);
  }

  add(v: Vector3, target: Vector3 = this): Vector3 {
    return prototype.add(this, v, target);
  }

  subtract(v: Vector3, target: Vector3 = this): Vector3 {
    return prototype.subtract(this, v, target);
  }

  scale(n: number, target: Vector3 = this): Vector3 {
    return prototype.scale(this, n, target);
  }

  normalize(target: Vector3 = this): Vector3 {
    return prototype.normalize(this, target);
  }

  transform(m: Matrix3 | Matrix4, target: Vector3 = this): Vector3 {
    return prototype.transform(this, m, target);
  }

  dot(v: Vector3): number {
    return prototype.dot(this, v);
  }

  cross(v: Vector3, target: Vector3 = this): Vector3 {
    return prototype.cross(this, v, target);
  }

  zero(): Vector3 {
    return prototype.zero(this);
  }

  toArray(): number[] {
    return prototype.toArray(this);
  }
}

export interface CreateVector3 {
  (): Vector3;
  (x: number, y: number, z: number): Vector3;
  (nums: number[]): Vector3;
  (v: Vector3): Vector3;
  (xy: Vector2, z: number): Vector3;
  (x: number, yz: Vector2): Vector3;
  (...args: VectorArgs): Vector3;
}

const createVector3: CreateVector3 = (...args: VectorArgs) => {
  return new Vector3(...args);
};

export const vec3 = Object.assign(createVector3, prototype);
