import { describe, expect, test } from 'vitest';
import { expectMatrix2 } from './matrix2-expect';
import { NUMS } from './matrix2-sample';
import { mat2 } from '/src';

describe('identity', () => {
  test('Matrix2.prototype.identity', () => {
    const m = mat2(NUMS.INDEX_ROW);
    const result = m.identity();
    expectMatrix2(m, NUMS.IDENTITY);
    expect(result === m).toBe(true);
  });

  test('mat2.identity', () => {
    const result = mat2.identity();
    expectMatrix2(result, NUMS.IDENTITY);
  });

  test('store result to target instance', () => {
    const target = mat2();
    const result = mat2.identity(target);
    expectMatrix2(target, NUMS.IDENTITY);
    expect(result === target).toBe(true);
  });
});
