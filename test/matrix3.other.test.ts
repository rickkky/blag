import { describe, expect, test } from 'vitest';
import { MAT3_NUMS, expectMatrix3 } from './matrix3-prepare';
import { mat3 } from '/src';

describe('identity', () => {
  test('Matrix3.prototype.identity', () => {
    const m = mat3(MAT3_NUMS.INDEX_ROW);
    const result = m.identity();
    expectMatrix3(m, MAT3_NUMS.IDENTITY);
    expect(result).toBe(m);
  });

  test('mat3.identity', () => {
    const result = mat3.identity();
    expectMatrix3(result, MAT3_NUMS.IDENTITY);
  });

  test('store result to target instance', () => {
    const target = mat3();
    const result = mat3.identity(target);
    expectMatrix3(target, MAT3_NUMS.IDENTITY);
    expect(result).toBe(target);
  });
});
