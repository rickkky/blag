import { VectorBase } from './vector-base';
import { MatrixBase } from './matrix-base';

export type MatrixArgs =
  | number[]
  | Iterable<number>[]
  | Iterable<Iterable<number>>[];

export function createMatrixPrototype<
  V extends VectorBase,
  M extends MatrixBase<V>,
>(createVector: () => V, createMatrix: () => M) {
  function set(target: M, ...args: MatrixArgs) {
    if (args[0] === target) {
      return target;
    }
    const dimension = target.dimension;
    const vecs: V[] = [];
    for (let i = 0; i < dimension; i++) {
      const v = createVector();
      v[i] = 1;
      vecs[i] = v;
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
      out: for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
          const index = i * dimension + j;
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
      for (let i = 0; i < dimension; i++) {
        if (i >= args.length) {
          break;
        }
        vecs[i].set(args[i] as Iterable<number>);
      }
    }
    target._vecs = vecs;
    return target;
  }

  function clone(m: M, target = createMatrix()) {
    return set(target, m);
  }

  function equals(m0: M, m1: M, precision = 0) {
    for (let i = 0; i < m0.dimension; i++) {
      if (!m0[i].equals(m1[i], precision)) {
        return false;
      }
    }
    return true;
  }

  function multiplyScalar(m: M, s: number, target = createMatrix()) {
    for (let i = 0; i < m.dimension; i++) {
      m[i].scale(s, target[i]);
    }
    return target;
  }

  function multiply(m0: M, m1: M, target = createMatrix()) {
    const vecs: V[] = [];
    for (let i = 0; i < m0.dimension; i++) {
      vecs.push(m1[i].transform(m0, createVector()) as V);
    }
    target._vecs = vecs;
    return target;
  }

  function multiplication(mats: M[], target = createMatrix()) {
    if (mats.length === 0) {
      return target;
    }
    target.set(mats[0]);
    for (let i = 1; i < mats.length; i++) {
      prototype.multiply(target, mats[i], target);
    }
    return target;
  }

  function transpose(m: M, target = createMatrix()) {
    const vecs = [];
    for (let i = 0; i < m.dimension; i++) {
      vecs[i] = createVector();
      for (let j = 0; j < m.dimension; j++) {
        vecs[i][j] = m[j][i];
      }
    }
    set(target, vecs);
    return target;
  }

  function minor(m: M, row: number, col: number) {
    const sub = m._sub(row, col);
    if (typeof sub !== 'number') {
      return sub.determinant();
    }
    return sub;
  }

  function cofactor(m: M, row: number, col: number) {
    const flag = (row + col) % 2 !== 0 ? -1 : 1;
    return flag * minor(m, row, col);
  }

  function determinant(m: M) {
    let count = 0;
    for (let i = 0; i < m.dimension; i++) {
      count += m[0][i] * cofactor(m, 0, i);
    }
    return count;
  }

  function invert(m: M, target = createMatrix()) {
    const det = m.determinant();
    if (det === 0) {
      throw new Error('Matrix is not invertible');
    }
    const cofs = [];
    for (let r = 0; r < m.dimension; r++) {
      for (let c = 0; c < m.dimension; c++) {
        cofs.push(m.cofactor(r, c));
      }
    }
    target
      .set(cofs)
      .transpose()
      .multiplyScalar(1 / det);
    return target;
  }

  function identity(target = createMatrix()) {
    set(target);
    return target;
  }

  function toArray(m: M) {
    return toColMajorArray(m);
  }

  function toColMajorArray(m: M) {
    return m._vecs.map((v) => v.toArray()).flat();
  }

  function toRowMajorArray(m: M) {
    return toColMajorArray(transpose(m));
  }

  function toArray2D(m: M) {
    return toColMajorArray2D(m);
  }

  function toColMajorArray2D(m: M) {
    return m._vecs.map((v) => v.toArray());
  }

  function toRowMajorArray2D(m: M) {
    return toColMajorArray2D(transpose(m));
  }

  const prototype = {
    set,
    clone,
    equals,
    multiplyScalar,
    multiply,
    multiplication,
    transpose,
    minor,
    cofactor,
    determinant,
    invert,
    identity,
    toArray,
    toColMajorArray,
    toRowMajorArray,
    toArray2D,
    toColMajorArray2D,
    toRowMajorArray2D,
  };

  return prototype;
}
