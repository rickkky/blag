import { expect } from 'vitest';
import { Vector4 } from '/src/index';
import { numDigits } from './constant';

export const expectVector4 = (v: Vector4, target: number[]) => {
  const [x, y, z, w] = target;
  expect(v.dimension).toBe(4);
  expect(v[0]).toBeCloseTo(x, numDigits);
  expect(v.x).toBeCloseTo(x, numDigits);
  expect(v[1]).toBeCloseTo(y, numDigits);
  expect(v.y).toBeCloseTo(y, numDigits);
  expect(v[2]).toBeCloseTo(z, numDigits);
  expect(v.z).toBeCloseTo(z, numDigits);
  expect(v[3]).toBeCloseTo(w, numDigits);
  expect(v.w).toBeCloseTo(w, numDigits);
  expect(v.size ** 2).toBeCloseTo(x * x + y * y + z * z + w * w, numDigits);
};

export const VEC4_NUMS = {
  ZERO: [0, 0, 0, 0],
  INDEX: [0, 1, 2, 3],
  INDEX_REVERSE: [3, 2, 1, 0],
};
