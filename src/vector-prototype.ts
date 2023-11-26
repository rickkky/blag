import { VectorBase } from './vector-base';
import { MatrixBase } from './matrix-base';

export type VectorArgs = (number | Iterable<number>)[];

export function createVectorPrototype<
  V extends VectorBase,
  M extends MatrixBase,
>(create: () => V) {
  function set(target: V, ...args: VectorArgs) {
    if (args[0] === target) {
      return target;
    }
    const dimension = target.dimension;
    const nums: number[] = [];
    out: for (const arg of args) {
      if (Number.isFinite(arg)) {
        nums.push(arg as number);
      } else if (
        arg &&
        typeof arg === 'object' &&
        typeof arg[Symbol.iterator] === 'function'
      ) {
        for (const n of arg) {
          nums.push(Number.isFinite(n) ? n : 0);
          if (nums.length >= dimension) {
            break out;
          }
        }
      } else {
        nums.push(0);
      }
      if (nums.length >= dimension) {
        break;
      }
    }
    if (nums.length < dimension) {
      for (let i = nums.length; i < dimension; i++) {
        nums.push(0);
      }
    }
    target._nums = nums;
    return target;
  }

  function clone(v: V, target = create()) {
    set(target, v);
    return target;
  }

  function equals(v0: V, v1: V, precision = 0) {
    if (v0.dimension !== v1.dimension) {
      return false;
    }
    for (let i = 0; i < v0.dimension; i++) {
      if (Math.abs(v0[i] - v1[i]) > precision) {
        return false;
      }
    }
    return true;
  }

  function add(v0: V, v1: V, target = create()) {
    for (let i = 0; i < v0.dimension; i++) {
      target[i] = v0[i] + v1[i];
    }
    return target;
  }

  function subtract(v0: V, v1: V, target = create()) {
    for (let i = 0; i < v0.dimension; i++) {
      target[i] = v0[i] - v1[i];
    }
    return target;
  }

  function scale(v: V, n: number, target = create()) {
    for (let i = 0; i < v.dimension; i++) {
      target[i] = v[i] * n;
    }
    return target;
  }

  function normalize(v: V, target = create()) {
    if (v.size === 0) {
      throw new Error('Cannot normalize a zero vector');
    }
    return scale(v, 1 / v.size, target);
  }

  function transform(v: V, m: M, target = create()) {
    const numsOrigin = [...v];
    let homogenous = false;
    if (v.dimension === m.dimension - 1) {
      numsOrigin.push(1);
      homogenous = true;
    }
    if (numsOrigin.length !== m.dimension) {
      throw new Error('Matrix dimension does not match the vector');
    }
    const numsTarget = [];
    for (let i = 0; i < numsOrigin.length; i++) {
      numsTarget[i] = 0;
      for (let j = 0; j < m.dimension; j++) {
        numsTarget[i] += numsOrigin[j] * m[j][i];
      }
    }
    if (homogenous) {
      const w = numsTarget.pop()!;
      for (let i = 0; i < numsTarget.length; i++) {
        numsTarget[i] /= w;
      }
    }
    target._nums = numsTarget;
    return target;
  }

  function dot(v0: V, v1: V) {
    let sum = 0;
    for (let i = 0; i < v0.dimension; i++) {
      sum += v0[i] * v1[i];
    }
    return sum;
  }

  function zero(target = create()) {
    set(target);
    return target;
  }

  function toArray(v: V) {
    return [...v];
  }

  return {
    set,
    clone,
    equals,
    add,
    subtract,
    scale,
    normalize,
    transform,
    dot,
    zero,
    toArray,
  };
}
