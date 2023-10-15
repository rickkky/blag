import { PRECISION } from './constant';
import { VectorArgs, VectorBase } from './vector-base';

export type MatrixArgs =
  | number[]
  | Iterable<number>[]
  | Iterable<Iterable<number>>[];

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

  protected abstract _vec(...args: VectorArgs): V;

  protected _mat(...args: MatrixArgs): this {
    return new (Object.getPrototypeOf(this).constructor)(...args);
  }

  protected abstract _submat(
    row: number,
    col: number,
  ): MatrixBase<any> | number;

  set(...args: MatrixArgs) {
    return set.apply(this, args) as this;
  }

  clone(target: this = this._mat()) {
    target.set(this);
    return target;
  }

  equals(m: this, precision = PRECISION[0]) {
    return (
      this.dimension === m.dimension &&
      this._array.every((v, i) => v.equals(m._array[i], precision))
    );
  }

  multiplyScalar(s: number, target = this) {
    target.set(this.toArray().map((n) => n * s));
    return target;
  }

  multiply(m: this, target = this) {
    const vecs = [];
    for (let i = 0; i < m.dimension; i++) {
      const v = m[i].clone().transform(this);
      vecs.push(v);
    }
    target.set(vecs);
    return target;
  }

  transpose(target = this) {
    const vecs = [];
    for (let i = 0; i < this.dimension; i++) {
      vecs[i] = this._vec();
      for (let j = 0; j < this.dimension; j++) {
        vecs[i][j] = this[j][i];
      }
    }
    target.set(vecs);
    return target;
  }

  minor(row: number, col: number) {
    const sub = this._submat(row, col);
    if (typeof sub !== 'number') {
      return sub.determinant();
    } else {
      return sub;
    }
  }

  cofactor(row: number, col: number) {
    const flag = (row + col) % 2 !== 0 ? -1 : 1;
    return flag * this.minor(row, col);
  }

  determinant() {
    let count = 0;
    for (let i = 0; i < this.dimension; i++) {
      count += this[0][i] * this.cofactor(0, i);
    }
    return count;
  }

  invert(target = this) {
    const det = this.determinant();
    if (det === 0) {
      throw new Error('Matrix is not invertible');
    }
    const cofs = [];
    for (let r = 0; r < this.dimension; r++) {
      for (let c = 0; c < this.dimension; c++) {
        cofs.push(this.cofactor(r, c));
      }
    }
    target
      .set(cofs)
      .transpose()
      .multiplyScalar(1 / det);
    return target;
  }

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

  toArray2D() {
    return this.toColMajorArray2D();
  }

  toColMajorArray() {
    return this._array.map((v) => v.toArray()).flat();
  }

  toColMajorArray2D() {
    return this._array.map((v) => v.toArray());
  }

  toRowMajorArray() {
    return this.clone().transpose().toColMajorArray();
  }

  toRowMajorArray2D() {
    return this.clone().transpose().toColMajorArray2D();
  }
}

function set<V extends VectorBase, M extends MatrixBase<V>>(
  this: M,
  ...args: MatrixArgs
) {
  const vecs: V[] = [];
  for (let i = 0; i < this.dimension; i++) {
    const v = this._vec();
    v[i] = 1;
    vecs.push(v);
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
        vecs[i][j] = Number.isFinite(num) ? num : 0;
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
      vecs[i].set(args[i] as Iterable<number>);
    }
  }
  this._array = vecs;
  return this;
}
