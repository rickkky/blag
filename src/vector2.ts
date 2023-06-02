import { VectorBase, set } from './vector';

export const vec2: Vector2['set'] = (...args: Parameters<typeof set>) => {
  return new Vector2(...args);
};

export class Vector2 extends VectorBase {
  constructor(x: number, y: number);
  constructor(list: number[]);
  constructor(v: Vector2);
  constructor(...args: Parameters<typeof set>);
  constructor(...args: Parameters<typeof set>) {
    super(...args);
  }

  get dimension() {
    return 2;
  }

  set(x: number, y: number): Vector2;
  set(list: number[]): Vector2;
  set(v: Vector2): Vector2;
  set(...args: Parameters<typeof set>): Vector2;
  set(...args: Parameters<typeof set>) {
    return set.apply(this, args);
  }

  clone() {
    return new Vector2(this.array);
  }

  get 1() {
    return this.array[1];
  }

  set 1(n: number) {
    this.array[1] = n;
  }

  get y() {
    return this[1];
  }

  set y(n: number) {
    this[1] = n;
  }

  get xy() {
    return new Vector2(this.x, this.y);
  }

  get yx() {
    return new Vector2(this.y, this.x);
  }
}
