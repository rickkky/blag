import { describe, expect, test } from 'vitest';
import { expectMatrix2 } from './matrix2-expect';
import { NUMS } from './matrix2-sample';
import { PRECISION, mat2 } from '/src';

describe('multiplyScalar', () => {
  const nums = NUMS.IDENTITY;
  const expected = nums.map((n) => n * 2);

  test('Matrix2.prototype.multiplyScalar', () => {
    const m = mat2(nums);
    const result = m.multiplyScalar(2);
    expectMatrix2(m, expected);
    expect(result === m).toBe(true);
  });

  test('mat2.multiplyScalar', () => {
    const m = mat2(nums);
    const result = mat2.multiplyScalar(m, 2);
    expectMatrix2(result, expected);
    expectMatrix2(m, nums);
  });

  test('store result to target instance', () => {
    const m = mat2(nums);
    const target = mat2();
    const result = mat2.multiplyScalar(m, 2, target);
    expectMatrix2(target, expected);
    expect(result === target).toBe(true);
  });
});

describe('multiply', () => {
  // prettier-ignore
  const nums0 = [
    0, 1,
    2, 3,
  ];
  // prettier-ignore
  const nums1 = [
    4, 5,
    6, 7,
  ];
  // prettier-ignore
  const expected = [
    10, 19,
    14, 27,
  ];

  test('Matrix2.prototype.multiply', () => {
    const m0 = mat2(nums0);
    const m1 = mat2(nums1);
    const result = m0.multiply(m1);
    expectMatrix2(m0, expected);
    expect(result === m0).toBe(true);
  });

  test('mat2.multiply', () => {
    const m0 = mat2(nums0);
    const m1 = mat2(nums1);
    const result = mat2.multiply(m0, m1);
    expectMatrix2(result, expected);
    expectMatrix2(m0, nums0);
    expectMatrix2(m1, nums1);
  });

  test('store result to target instance', () => {
    const m0 = mat2(nums0);
    const m1 = mat2(nums1);
    const target = mat2();
    const result = mat2.multiply(m0, m1, target);
    expectMatrix2(target, expected);
    expect(result === target).toBe(true);
  });

  test('mat2.multiplication', () => {
    const result = mat2.multiplication(
      mat2.identity(),
      mat2(nums0),
      mat2(nums1),
    );
    expectMatrix2(result, expected);
  });
});

describe('transpose', () => {
  test('Matrix2.prototype.transpose', () => {
    const m = mat2(NUMS.INDEX_ROW);
    const result = m.transpose();
    expectMatrix2(m, NUMS.INDEX_COL);
    expect(result === m).toBe(true);
  });

  test('mat2.transpose', () => {
    const m = mat2(NUMS.INDEX_ROW);
    const result = mat2.transpose(m);
    expectMatrix2(result, NUMS.INDEX_COL);
    expectMatrix2(m, NUMS.INDEX_ROW);
  });

  test('store result to target instance', () => {
    const m = mat2(NUMS.INDEX_ROW);
    const target = mat2();
    const result = mat2.transpose(m, target);
    expectMatrix2(target, NUMS.INDEX_COL);
    expect(result === target).toBe(true);
  });
});

describe('determinant', () => {
  // prettier-ignore
  const nums = [
    0, 1,
    2, 3,
  ];
  const expected = -2;

  test('mat2.determinant', () => {
    const m = mat2(nums);
    const result = mat2.determinant(m);
    expect(result).toBe(expected);
  });
});

describe('invert', () => {
  const identity = mat2.identity();
  // prettier-ignore
  const nums = [
    0, 1,
    2, 3,
  ];

  test('Matrix2.prototype.invert', () => {
    const m0 = mat2(nums);
    const m1 = mat2(nums);
    const result = m1.invert();
    const multiplyResult = mat2.multiply(m0, m1);
    expect(identity.equals(multiplyResult, PRECISION[15])).toBe(true);
    expect(result === m1).toBe(true);
  });

  test('mat2.invert', () => {
    const m = mat2(nums);
    const result = mat2.invert(m);
    const multiplyResult = mat2.multiply(m, result);
    expect(identity.equals(multiplyResult, PRECISION[15])).toBe(true);
  });

  test('store result to target instance', () => {
    const m = mat2(nums);
    const target = mat2();
    const result = mat2.invert(m, target);
    const multiplyResult = mat2.multiply(m, result);
    expect(identity.equals(multiplyResult, PRECISION[15])).toBe(true);
    expect(result === target).toBe(true);
  });
});
