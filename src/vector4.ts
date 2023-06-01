import { Vector2 } from './vector2';
import { Vector3 } from './vector3';

export class Vector4 extends Vector3 {
  constructor(x?: number, y?: number, z?: number, w?: number);
  constructor(...args: number[]) {
    super(...args);
  }

  set(x?: number, y?: number, z?: number, w?: number): void;
  set(...args: number[]): void {
    super.set(...args);
    this.array[3] = args[3] || 0;
  }

  get 3() {
    return this.array[3];
  }

  set 3(n: number) {
    this.array[3] = n;
  }

  get w() {
    return this[3];
  }

  set w(n: number) {
    this[3] = n;
  }

  clone() {
    return new Vector4(...this.array);
  }

  get xw() {
    return new Vector2(this.x, this.w);
  }

  get wx() {
    return new Vector2(this.w, this.x);
  }

  get yw() {
    return new Vector2(this.y, this.w);
  }

  get wy() {
    return new Vector2(this.w, this.y);
  }

  get zw() {
    return new Vector2(this.z, this.w);
  }

  get wz() {
    return new Vector2(this.w, this.z);
  }

  get xyw() {
    return new Vector3(this.x, this.y, this.w);
  }

  get xwy() {
    return new Vector3(this.x, this.w, this.y);
  }

  get yxw() {
    return new Vector3(this.y, this.x, this.w);
  }

  get ywx() {
    return new Vector3(this.y, this.w, this.x);
  }

  get wxy() {
    return new Vector3(this.w, this.x, this.y);
  }

  get wyx() {
    return new Vector3(this.w, this.y, this.x);
  }

  get xzw() {
    return new Vector3(this.x, this.z, this.w);
  }

  get xwz() {
    return new Vector3(this.x, this.w, this.z);
  }

  get zxw() {
    return new Vector3(this.z, this.x, this.w);
  }

  get zwx() {
    return new Vector3(this.z, this.w, this.x);
  }

  get wxz() {
    return new Vector3(this.w, this.x, this.z);
  }

  get wzx() {
    return new Vector3(this.w, this.z, this.x);
  }

  get yzw() {
    return new Vector3(this.y, this.z, this.w);
  }

  get ywz() {
    return new Vector3(this.y, this.w, this.z);
  }

  get zyw() {
    return new Vector3(this.z, this.y, this.w);
  }

  get zwy() {
    return new Vector3(this.z, this.w, this.y);
  }

  get wyz() {
    return new Vector3(this.w, this.y, this.z);
  }

  get wzy() {
    return new Vector3(this.w, this.z, this.y);
  }

  get xyzw() {
    return new Vector4(this.x, this.y, this.z, this.w);
  }

  get xywz() {
    return new Vector4(this.x, this.y, this.w, this.z);
  }

  get xzyw() {
    return new Vector4(this.x, this.z, this.y, this.w);
  }

  get xzwy() {
    return new Vector4(this.x, this.z, this.w, this.y);
  }

  get xwyz() {
    return new Vector4(this.x, this.w, this.y, this.z);
  }

  get xwzy() {
    return new Vector4(this.x, this.w, this.z, this.y);
  }

  get yxzw() {
    return new Vector4(this.y, this.x, this.z, this.w);
  }

  get yxwz() {
    return new Vector4(this.y, this.x, this.w, this.z);
  }

  get yzxw() {
    return new Vector4(this.y, this.z, this.x, this.w);
  }

  get yzwx() {
    return new Vector4(this.y, this.z, this.w, this.x);
  }

  get ywxz() {
    return new Vector4(this.y, this.w, this.x, this.z);
  }

  get ywzx() {
    return new Vector4(this.y, this.w, this.z, this.x);
  }

  get zxyw() {
    return new Vector4(this.z, this.x, this.y, this.w);
  }

  get zxwy() {
    return new Vector4(this.z, this.x, this.w, this.y);
  }

  get zyxw() {
    return new Vector4(this.z, this.y, this.x, this.w);
  }

  get zywx() {
    return new Vector4(this.z, this.y, this.w, this.x);
  }

  get zwxy() {
    return new Vector4(this.z, this.w, this.x, this.y);
  }

  get zwyx() {
    return new Vector4(this.z, this.w, this.y, this.x);
  }

  get wxyz() {
    return new Vector4(this.w, this.x, this.y, this.z);
  }

  get wxzy() {
    return new Vector4(this.w, this.x, this.z, this.y);
  }

  get wyxz() {
    return new Vector4(this.w, this.y, this.x, this.z);
  }

  get wyzx() {
    return new Vector4(this.w, this.y, this.z, this.x);
  }

  get wzxy() {
    return new Vector4(this.w, this.z, this.x, this.y);
  }

  get wzyx() {
    return new Vector4(this.w, this.z, this.y, this.x);
  }
}
