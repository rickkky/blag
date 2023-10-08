import { describe, expect, test } from 'vitest';
import { expectMatrix4 } from './matrix4-expect';
import { NUMS } from './matrix4-sample';
import { mat4 } from '/src';

describe('identity', () => {
  test('Matrix2.prototype.identity', () => {
    const m = mat4(NUMS.INDEX_ROW);
    const result = m.identity();
    expectMatrix4(m, NUMS.IDENTITY);
    expect(result === m).toBe(true);
  });

  test('mat2.identity', () => {
    const result = mat4.identity();
    expectMatrix4(result, NUMS.IDENTITY);
  });

  test('store result to target instance', () => {
    const target = mat4();
    const result = mat4.identity(target);
    expectMatrix4(target, NUMS.IDENTITY);
    expect(result === target).toBe(true);
  });
});
