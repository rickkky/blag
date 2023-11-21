import { expect } from 'vitest';
import { Vector3 } from '/src/index';
import { numDigits } from './constant';

export const expectVector3 = (v: Vector3, target: number[]) => {
  const [x, y, z] = target;
  expect(v.dimension).toBe(3);
  expect(v[0]).toBeCloseTo(x, numDigits);
  expect(v.x).toBeCloseTo(x, numDigits);
  expect(v[1]).toBeCloseTo(y, numDigits);
  expect(v.y).toBeCloseTo(y, numDigits);
  expect(v[2]).toBeCloseTo(z, numDigits);
  expect(v.z).toBeCloseTo(z, numDigits);
  expect(v.size ** 2).toBeCloseTo(x * x + y * y + z * z, numDigits);
};

export const VEC3_NUMS = {
  ZERO: [0, 0, 0],
  INDEX: [0, 1, 2],
  INDEX_REVERSE: [2, 1, 0],
};
