import { describe, expect, test } from 'vitest';
import { expectMatrix4 } from './matrix4-expect';
import { NUMS } from './matrix4-sample';
import { expectMatrix3 } from './matrix3-expect';
import { mat3, mat4 } from '/src';

describe('multiply', () => {
  // prettier-ignore
  const nums0 = [
    0,  1,  2,  3,
    4,  5,  6,  7,
    8,  9,  10, 11,
    12, 13, 14, 15,
  ];
  // prettier-ignore
  const nums1 = [
    16, 17, 18, 19,
    20, 21, 22, 23,
    24, 25, 26, 27,
    28, 29, 30, 31,
  ];
  // prettier-ignore
  const expected = [
    440, 510, 580, 650,
    536, 622, 708, 794,
    632, 734, 836, 938,
    728, 846, 964, 1082,
  ];

  test('Matrix4.prototype.multiply', () => {
    const m0 = mat4(nums0);
    const m1 = mat4(nums1);
    const result = m0.multiply(m1);
    expectMatrix4(m0, expected);
    expect(result === m0).toBe(true);
  });

  test('mat4.multiply', () => {
    const m0 = mat4(nums0);
    const m1 = mat4(nums1);
    const result = mat4.multiply(m0, m1);
    expectMatrix4(result, expected);
    expectMatrix4(m0, nums0);
    expectMatrix4(m1, nums1);
  });

  test('store result to target instance', () => {
    const m0 = mat4(nums0);
    const m1 = mat4(nums1);
    const target = mat4();
    const result = mat4.multiply(m0, m1, target);
    expectMatrix4(target, expected);
    expect(result === target).toBe(true);
  });
});

describe('transpose', () => {
  test('Matrix4.prototype.transpose', () => {
    const m = mat4(NUMS.INDEX_ROW);
    const result = m.transpose();
    expectMatrix4(m, NUMS.INDEX_COL);
    expect(result === m).toBe(true);
  });

  test('mat4.transpose', () => {
    const m = mat4(NUMS.INDEX_ROW);
    const result = mat4.transpose(m);
    expectMatrix4(result, NUMS.INDEX_COL);
    expectMatrix4(m, NUMS.INDEX_ROW);
  });

  test('store result to target instance', () => {
    const m = mat4(NUMS.INDEX_ROW);
    const target = mat4();
    const result = mat4.transpose(m, target);
    expectMatrix4(target, NUMS.INDEX_COL);
    expect(result === target).toBe(true);
  });
});

describe('minor', () => {
  // prettier-ignore
  const nums = [
    0,  1,  2,  3,
    4,  5,  6,  7,
    8,  9,  10, 11,
    12, 13, 14, 15,
  ];
  // prettier-ignore
  const expected = [
    5,  6,  7,
    9,  10, 11,
    13, 14, 15,
  ];

  test('mat4.minor', () => {
    const m = mat4(nums);
    const result = mat4.minor(m, 0, 0);
    expectMatrix3(result, expected);
  });

  test('store result to target instance', () => {
    const m = mat4(nums);
    const target = mat3();
    const result = mat4.minor(m, 0, 0, target);
    expectMatrix3(target, expected);
    expect(result === target).toBe(true);
  });
});

describe('determinant', () => {
  test('mat4.determinant', () => {
    // prettier-ignore
    const nums = [
       2,  3,   4,   5,
      -1, -21, -3,  -4,
       6,  7,   8,   10,
      -8, -9,  -10, -12
    ];
    const expected = 76;

    const m = mat4(nums);
    const result = mat4.determinant(m);
    expect(result).toBe(expected);
  });
});
