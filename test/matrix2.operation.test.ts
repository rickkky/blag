import { describe, expect, test } from 'vitest';
import { expectMatrix2 } from './matrix2-expect';
import { expectVector2 } from './vector2-expect';
import { Matrix2, PRECISION, mat2, vec2 } from '/src';

describe('multiply', () => {
  const nums0 = [0, 1, 2, 3];
  const nums1 = [4, 5, 6, 7];
  const expected = [10, 19, 14, 27];

  test('Matrix2.prototype.multiply', () => {
    const m0 = new Matrix2(nums0);
    const m1 = new Matrix2(nums1);
    m0.multiply(m1);
    expectMatrix2(m0, expected);
  });

  test('mat2.multiply', () => {
    const m0 = new Matrix2(nums0);
    const m1 = new Matrix2(nums1);
    const result = mat2.multiply(m0, m1);
    expectMatrix2(result, expected);
    expectMatrix2(m0, nums0);
    expectMatrix2(m1, nums1);
  });

  test('store result to target instance', () => {});
});
