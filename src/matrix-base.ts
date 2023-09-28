import { PRECISION } from './constant';
import { VectorArgs, VectorBase } from './vector-base';

export type MatrixArgs = number[] | Iterable<number>[] | Iterable<VectorBase>[];

export abstract class MatrixBase<V extends VectorBase> {
  protected _array: V[] = [];

  constructor(...args: MatrixArgs) {
    set.apply(this, args);
  }

  abstract get dimension(): number;

  [index: number]: V;

  [Symbol.iterator]() {
    return this._array[Symbol.iterator]();
  }

  protected abstract _vector(...args: VectorArgs): V;

  set(...args: MatrixArgs) {
    return set.apply(this, args) as this;
  }

  clone(target: this = new (Object.getPrototypeOf(this).constructor)()) {
    return target.set(this);
  }

  equals(m: this, precision = PRECISION[0]) {
    return (
      this.dimension === m.dimension &&
      this._array.every((v, i) => v.equals(m._array[i], precision))
    );
  }

  multiply(m: this, target: this = this) {
    const vectors = [];
    for (let i = 0; i < m.dimension; i++) {
      const v = m[i].clone().transform(this);
      vectors.push(v);
    }
    return target.set(vectors);
  }

  transpose(target: this = this) {
    const vectors = [];
    for (let i = 0; i < this.dimension; i++) {
      vectors[i] = this._vector();
      for (let j = 0; j < this.dimension; j++) {
        vectors[i][j] = this[j][i];
      }
    }
    return target.set(vectors);
  }

  abstract determinant(): number;

  identity() {
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        this._array[i][j] = i === j ? 1 : 0;
      }
    }
    return this;
  }

  toArray() {
    return this.toColMajorArray();
  }

  toColMajorArray() {
    return this._array.map((v) => v.toArray()).flat();
  }

  toRowMajorArray() {
    return this.clone().transpose().toColMajorArray();
  }
}

function set<V extends VectorBase, M extends MatrixBase<V>>(
  this: M,
  ...args: MatrixArgs
) {
  const vectors: V[] = [];
  for (let i = 0; i < this.dimension; i++) {
    const v = this._vector();
    v[i] = 1;
    vectors.push(v);
  }
  if (
    args.length === 1 &&
    args[0] &&
    typeof args[0] === 'object' &&
    typeof args[0][Symbol.iterator] === 'function'
  ) {
    args = [...args[0]] as number[] | Iterable<number>[];
  }
  if (typeof args[0] === 'number') {
    out: for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        const index = i * this.dimension + j;
        if (index >= args.length) {
          break out;
        }
        const num = args[index] as number;
        vectors[i][j] = Number.isFinite(num) ? num : 0;
      }
    }
  } else if (
    args[0] &&
    typeof args[0] === 'object' &&
    typeof args[0][Symbol.iterator] === 'function'
  ) {
    for (let i = 0; i < this.dimension; i++) {
      if (i >= args.length) {
        break;
      }
      vectors[i].set(args[i] as Iterable<number>);
    }
  }
  this._array = vectors;
  return this;
}
