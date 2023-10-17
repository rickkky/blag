import { expect } from 'vitest';
import { Vector3 } from '../src/vector3-class';

export const expectVector3 = (v: Vector3, target: number[]) => {
  const [x, y, z] = target;
  expect(v.dimension).toBe(3);
  expect(v[0]).toBe(x);
  expect(v.x).toBe(x);
  expect(v[1]).toBe(y);
  expect(v.y).toBe(y);
  expect(v[2]).toBe(z);
  expect(v.z).toBe(z);
  expect(v.size).toBeCloseTo(Math.sqrt(x * x + y * y + z * z), 12);
};

export const VEC3_NUMS = {
  ZERO: [0, 0, 0],
  INDEX: [0, 1, 2],
  INDEX_REVERSE: [2, 1, 0],
};
