import { set } from './vector';
import { Vector2, Vector2Base } from './vector2';

export class Vector3Base extends Vector2Base {
  get dimension() {
    return 3;
  }

  get 2() {
    return this.array[2];
  }

  set 2(n: number) {
    this.array[2] = n;
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
  constructor(...args: Parameters<typeof set>);
  constructor(...args: Parameters<typeof set>) {
    super(...args);
  }

  set(x: number, y: number, z: number): Vector3;
  set(list: number[]): Vector3;
  set(v: Vector3): Vector3;
  set(xy: Vector2, z: number): Vector3;
  set(x: number, yz: Vector2): Vector3;
  set(...args: Parameters<typeof set>): Vector3;
  set(...args: Parameters<typeof set>) {
    return set.apply(this, args);
  }

  clone() {
    return new Vector3(this.array);
  }

  cross(v: Vector3) {
    const [x0, y0, z0] = this;
    const [x1, y1, z1] = v;
    this[0] = y0 * z1 - z0 * y1;
    this[1] = z0 * x1 - x0 * z1;
    this[2] = x0 * y1 - y0 * x1;
    return this;
  }
}

export const vec3: Vector3['set'] = (...args: Parameters<typeof set>) => {
  return new Vector3(...args);
};
