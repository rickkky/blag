import { describe, expect, test } from 'vitest';
import { MAT3_NUMS, expectMatrix3 } from './matrix3-prepare';
import { PRECISION, mat3 } from '/src';

describe('multiplyScalar', () => {
  const nums = MAT3_NUMS.IDENTITY;
  const expected = nums.map((n) => n * 2);

  test('Matrix2.prototype.multiplyScalar', () => {
    const m = mat3(nums);
    const result = m.multiplyScalar(2);
    expectMatrix3(m, expected);
    expect(result).toBe(m);
  });

  test('mat2.multiplyScalar', () => {
    const m = mat3(nums);
    const result = mat3.multiplyScalar(m, 2);
    expectMatrix3(result, expected);
    expectMatrix3(m, nums);
  });

  test('store result to target instance', () => {
    const m = mat3(nums);
    const target = mat3();
    const result = mat3.multiplyScalar(m, 2, target);
    expectMatrix3(target, expected);
    expect(result).toBe(target);
  });
});

describe('multiply', () => {
  // prettier-ignore
  const nums0 = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
  ];
  // prettier-ignore
  const nums1 = [
    9,  10, 11,
    12, 13, 14,
    15, 16, 17,
  ];
  // prettier-ignore
  const expected = [
    96,  126, 156,
    123, 162, 201,
    150, 198, 246,
  ];

  test('Matrix3.prototype.multiply', () => {
    const m0 = mat3(nums0);
    const m1 = mat3(nums1);
    const result = m0.multiply(m1);
    expectMatrix3(m0, expected);
    expect(result).toBe(m0);
    expectMatrix3(m1, nums1);
  });

  test('mat3.multiply', () => {
    const m0 = mat3(nums0);
    const m1 = mat3(nums1);
    const result = mat3.multiply(m0, m1);
    expectMatrix3(result, expected);
    expectMatrix3(m0, nums0);
    expectMatrix3(m1, nums1);
  });

  test('store result to target instance', () => {
    const m0 = mat3(nums0);
    const m1 = mat3(nums1);
    const target = mat3();
    const result = mat3.multiply(m0, m1, target);
    expectMatrix3(target, expected);
    expect(result).toBe(target);
  });

  test('mat3.multiplication', () => {
    const result = mat3.multiplication(
      mat3.identity(),
      mat3(nums0),
      mat3(nums1),
    );
    expectMatrix3(result, expected);
  });
});

describe('transpose', () => {
  test('Matrix3.prototype.transpose', () => {
    const m = mat3(MAT3_NUMS.INDEX_ROW);
    const result = m.transpose();
    expectMatrix3(m, MAT3_NUMS.INDEX_COL);
    expect(result).toBe(m);
  });

  test('mat3.transpose', () => {
    const m = mat3(MAT3_NUMS.INDEX_ROW);
    const result = mat3.transpose(m);
    expectMatrix3(result, MAT3_NUMS.INDEX_COL);
    expectMatrix3(m, MAT3_NUMS.INDEX_ROW);
  });

  test('store result to target instance', () => {
    const m = mat3(MAT3_NUMS.INDEX_ROW);
    const target = mat3();
    const result = mat3.transpose(m, target);
    expectMatrix3(target, MAT3_NUMS.INDEX_COL);
    expect(result).toBe(target);
  });
});

describe('determinant', () => {
  // prettier-ignore
  const nums = [
    2, 3,  4,
    5, 13, 7,
    8, 9,  11,
  ];
  const expected = -73;

  test('mat3.determinant', () => {
    const m = mat3(nums);
    const result = mat3.determinant(m);
    expect(result).toBe(expected);
  });
});

describe('invert', () => {
  const identity = mat3.identity();
  // prettier-ignore
  const nums = [
    1, 0, 0,
    2, 3, 0,
    4, 5, 6,
  ];

  test('Matrix3.prototype.invert', () => {
    const m0 = mat3(nums);
    const m1 = mat3(nums);
    const result = m1.invert();
    const multiplyResult = mat3.multiply(m0, m1);
    expect(identity.equals(multiplyResult, PRECISION[15])).toBe(true);
    expect(result).toBe(m1);
  });

  test('mat3.invert', () => {
    const m = mat3(nums);
    const result = mat3.invert(m);
    const multiplyResult = mat3.multiply(m, result);
    expect(identity.equals(multiplyResult, PRECISION[15])).toBe(true);
  });

  test('store result to target instance', () => {
    const m = mat3(nums);
    const target = mat3();
    const result = mat3.invert(m, target);
    const multiplyResult = mat3.multiply(m, target);
    expect(identity.equals(multiplyResult, PRECISION[15])).toBe(true);
    expect(result).toBe(target);
  });
});
