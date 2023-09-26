import { VectorBase } from './vector-base';

export function createVectorStatics<V extends VectorBase, M>(
  Vector: new () => V,
) {
  const statics = {
    clone(v: V, target?: V) {
      return v.clone(target);
    },

    equals(v0: V, v1: V, precision?: number) {
      return v0.equals(v1, precision);
    },

    add(v0: V, v1: V, target = new Vector()) {
      return target.set(v0).add(v1);
    },

    substract(v0: V, v1: V, target = new Vector()) {
      return target.set(v0).substract(v1);
    },

    scale(v: V, n: number, target = new Vector()) {
      return target.set(v).scale(n);
    },

    transform(v: V, m: M, target = new Vector()) {
      return target.set(v).transform(m);
    },

    normalize(v: V, target = new Vector()) {
      return target.set(v).normalize();
    },

    zero() {
      return new Vector();
    },

    dot(v0: V, v1: V) {
      return v0.dot(v1);
    },
  };

  return statics;
}
