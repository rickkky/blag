import { Vector2 } from './vector2';

export class Vector3 extends Vector2 {
  constructor(x?: number, y?: number, z?: number);
  constructor(...args: number[]) {
    super(...args);
  }

  set(x?: number, y?: number, z?: number): void;
  set(...args: number[]): void {
    super.set(...args);
    this.array[2] = args[2] || 0;
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

  clone() {
    return new Vector3(...this.array);
  }

  cross(v: Vector3) {
    const [x0, y0, z0] = this;
    const [x1, y1, z1] = v;
    this[0] = y0 * z1 - z0 * y1;
    this[1] = z0 * x1 - x0 * z1;
    this[2] = x0 * y1 - y0 * x1;
    return this;
  }

  get xz() {
    return new Vector2(this.x, this.z);
  }

  get zx() {
    return new Vector2(this.z, this.x);
  }

  get yz() {
    return new Vector2(this.y, this.z);
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
