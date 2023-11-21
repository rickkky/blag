import { VectorArgs } from './vector-prototype';

export abstract class VectorBase {
  _nums: number[] = [];

  constructor() {}

  abstract get dimension(): number;

  get size() {
    return Math.hypot(...this._nums);
  }

  [index: number]: number;

  [Symbol.iterator]() {
    return this._nums[Symbol.iterator]();
  }

  abstract set(...args: VectorArgs): VectorBase;

  abstract clone(target?: VectorBase): VectorBase;

  abstract equals(v: VectorBase, precision?: number): boolean;

  abstract add(v: VectorBase, target?: VectorBase): VectorBase;

  abstract subtract(v: VectorBase, target?: VectorBase): VectorBase;

  abstract scale(n: number, target?: VectorBase): VectorBase;

  abstract normalize(target?: VectorBase): VectorBase;

  abstract transform(m: any, target?: VectorBase): VectorBase;

  abstract dot(v: VectorBase): number;

  abstract zero(): VectorBase;

  abstract toArray(): number[];
}
