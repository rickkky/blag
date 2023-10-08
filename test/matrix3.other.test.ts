import { describe, expect, test } from 'vitest';
import { expectMatrix3 } from './matrix3-expect';
import { NUMS } from './matrix3-sample';
import { mat3 } from '/src';

describe('identity', () => {
  test('Matrix2.prototype.identity', () => {
    const m = mat3(NUMS.INDEX_ROW);
    const result = m.identity();
    expectMatrix3(m, NUMS.IDENTITY);
    expect(result === m).toBe(true);
  });

  test('mat2.identity', () => {
    const result = mat3.identity();
    expectMatrix3(result, NUMS.IDENTITY);
  });

  test('store result to target instance', () => {
    const target = mat3();
    const result = mat3.identity(target);
    expectMatrix3(target, NUMS.IDENTITY);
    expect(result === target).toBe(true);
  });
});
