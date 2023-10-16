import { VectorBase } from './vector-base';

export function createVecPrototype<V extends VectorBase, M>(
  Vector: new () => V,
) {
  const prototype = {
    clone(v: V, target = new Vector()) {
      return v.clone(target);
    },

    equals(v0: V, v1: V, precision?: number) {
      return v0.equals(v1, precision);
    },

    add(v0: V, v1: V, target = new Vector()) {
      return v0.add(v1, target);
    },

    substract(v0: V, v1: V, target = new Vector()) {
      return v0.substract(v1, target);
    },

    scale(v: V, n: number, target = new Vector()) {
      return v.scale(n, target);
    },

    transform(v: V, m: M, target = new Vector()) {
      return v.transform(m, target);
    },

    normalize(v: V, target = new Vector()) {
      return v.normalize(target);
    },

    zero() {
      return new Vector();
    },

    dot(v0: V, v1: V) {
      return v0.dot(v1);
    },
  };

  return prototype;
}
