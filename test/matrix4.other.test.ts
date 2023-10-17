import { describe, expect, test } from 'vitest';
import { MAT4_NUMS, expectMatrix4 } from './matrix4-prepare';
import { mat4 } from '/src';

describe('identity', () => {
  test('Matrix4.prototype.identity', () => {
    const m = mat4(MAT4_NUMS.INDEX_ROW);
    const result = m.identity();
    expectMatrix4(m, MAT4_NUMS.IDENTITY);
    expect(result).toBe(m);
  });

  test('mat4.identity', () => {
    const result = mat4.identity();
    expectMatrix4(result, MAT4_NUMS.IDENTITY);
  });

  test('store result to target instance', () => {
    const target = mat4();
    const result = mat4.identity(target);
    expectMatrix4(target, MAT4_NUMS.IDENTITY);
    expect(result).toBe(target);
  });
});
