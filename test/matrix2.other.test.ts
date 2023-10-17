import { describe, expect, test } from 'vitest';
import { MAT2_NUMS, expectMatrix2 } from './matrix2-prepare';
import { mat2 } from '/src';

describe('identity', () => {
  test('Matrix2.prototype.identity', () => {
    const m = mat2(MAT2_NUMS.INDEX_ROW);
    const result = m.identity();
    expectMatrix2(m, MAT2_NUMS.IDENTITY);
    expect(result).toBe(m);
  });

  test('mat2.identity', () => {
    const result = mat2.identity();
    expectMatrix2(result, MAT2_NUMS.IDENTITY);
  });

  test('store result to target instance', () => {
    const target = mat2();
    const result = mat2.identity(target);
    expectMatrix2(target, MAT2_NUMS.IDENTITY);
    expect(result).toBe(target);
  });
});
