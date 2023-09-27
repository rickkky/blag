import { expect } from 'vitest';
import { Vector4 } from '/src/vector4';

export const expectVector4 = (v: Vector4, [x, y, z, w]: number[]) => {
  expect(v.dimension).toBe(4);
  expect(v[0]).toBe(x);
  expect(v.x).toBe(x);
  expect(v[1]).toBe(y);
  expect(v.y).toBe(y);
  expect(v[2]).toBe(z);
  expect(v.z).toBe(z);
  expect(v[3]).toBe(w);
  expect(v.w).toBe(w);
  expect(v.size).toBeCloseTo(Math.sqrt(x * x + y * y + z * z + w * w), 12);
};
