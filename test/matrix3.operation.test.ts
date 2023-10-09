import { describe, expect, test } from 'vitest';
import { expectMatrix3 } from './matrix3-expect';
import { NUMS } from './matrix3-sample';
import { expectMatrix2 } from './matrix2-expect';
import { mat2, mat3 } from '/src';

describe('multiplyScalar', () => {
  const nums = NUMS.IDENTITY;
  const expected = nums.map((n) => n * 2);

  test('Matrix2.prototype.multiplyScalar', () => {
    const m = mat3(nums);
    const result = m.multiplyScalar(2);
    expectMatrix3(m, expected);
    expect(result === m).toBe(true);
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
    expect(result === target).toBe(true);
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
    expect(result === m0).toBe(true);
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
    expect(result === target).toBe(true);
  });
});

describe('transpose', () => {
  test('Matrix3.prototype.transpose', () => {
    const m = mat3(NUMS.INDEX_ROW);
    const result = m.transpose();
    expectMatrix3(m, NUMS.INDEX_COL);
    expect(result === m).toBe(true);
  });

  test('mat3.transpose', () => {
    const m = mat3(NUMS.INDEX_ROW);
    const result = mat3.transpose(m);
    expectMatrix3(result, NUMS.INDEX_COL);
    expectMatrix3(m, NUMS.INDEX_ROW);
  });

  test('store result to target instance', () => {
    const m = mat3(NUMS.INDEX_ROW);
    const target = mat3();
    const result = mat3.transpose(m, target);
    expectMatrix3(target, NUMS.INDEX_COL);
    expect(result === target).toBe(true);
  });
});

describe('minor', () => {
  // prettier-ignore
  const nums = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
  ];
  // prettier-ignore
  const expected = [
    4, 5,
    7, 8,
  ];

  test('mat3.minor', () => {
    const m = mat3(nums);
    const result = mat3.minor(m, 0, 0);
    expectMatrix2(result, expected);
  });

  test('store result to target instance', () => {
    const m = mat3(nums);
    const target = mat2();
    const result = mat3.minor(m, 0, 0, target);
    expectMatrix2(target, expected);
    expect(result === target).toBe(true);
  });
});

describe('determinant', () => {
  test('mat3.determinant', () => {
    // prettier-ignore
    const nums = [
      2, 3,  4,
      5, 13, 7,
      8, 9,  11,
    ];
    const expected = -73;

    const m = mat3(nums);
    const result = mat3.determinant(m);
    expect(result).toBe(expected);
  });
});
