import { describe, expect, test } from 'vitest';
import { expectMatrix4 } from './matrix4-expect';
import { NUMS } from './matrix4-sample';
import { Matrix4, PRECISION, mat4, vec4 } from '/src';

describe('create', () => {
  const v0 = vec4(NUMS.INDEX_ROW.slice(0, 4));
  const v1 = vec4(NUMS.INDEX_ROW.slice(4, 8));
  const v2 = vec4(NUMS.INDEX_ROW.slice(8, 12));
  const v3 = vec4(NUMS.INDEX_ROW.slice(12, 16));

  test('constructor', () => {
    expectMatrix4(new Matrix4(), NUMS.IDENTITY);

    expectMatrix4(new Matrix4(...NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix4(new Matrix4(NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix4(new Matrix4(v0, v1, v2, v3), NUMS.INDEX_ROW);

    expectMatrix4(new Matrix4(new Matrix4(NUMS.INDEX_ROW)), NUMS.INDEX_ROW);
  });

  test('mat4', () => {
    expectMatrix4(mat4(), NUMS.IDENTITY);

    expectMatrix4(mat4(...NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix4(mat4(NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix4(mat4(v0, v1, v2, v3), NUMS.INDEX_ROW);

    expectMatrix4(mat4(mat4(NUMS.INDEX_ROW)), NUMS.INDEX_ROW);
  });
});

describe('set', () => {
  const v0 = vec4(NUMS.INDEX_ROW.slice(0, 4));
  const v1 = vec4(NUMS.INDEX_ROW.slice(4, 8));
  const v2 = vec4(NUMS.INDEX_ROW.slice(8, 12));
  const v3 = vec4(NUMS.INDEX_ROW.slice(12, 16));

  test('Matrix4.prototype.set', () => {
    expectMatrix4(mat4().set(...NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix4(mat4().set(NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix4(mat4().set(v0, v1, v2, v3), NUMS.INDEX_ROW);

    expectMatrix4(mat4().set(mat4(NUMS.INDEX_ROW)), NUMS.INDEX_ROW);
  });

  test('index setter', () => {
    const m = mat4();
    m[0] = v0;
    m[1] = v1;
    m[2] = v2;
    m[3] = v3;
    expectMatrix4(m, NUMS.INDEX_ROW);
    expect(m[0] === v0).toBe(false);
    expect(m[1] === v1).toBe(false);
    expect(m[2] === v2).toBe(false);
    expect(m[3] === v3).toBe(false);
  });
});

describe('convert to array', () => {
  test('iterator', () => {
    const m = mat4();
    const vecs = [...m];
    expect(vecs[0] === m[0]).toBe(true);
    expect(vecs[1] === m[1]).toBe(true);
    expect(vecs[2] === m[2]).toBe(true);
    expect(vecs[3] === m[3]).toBe(true);
  });

  test('toArray', () => {
    const m = mat4(NUMS.INDEX_ROW);
    expect(mat4.toArray(m)).toEqual(NUMS.INDEX_ROW);
  });

  test('toColMajorArray', () => {
    const m = mat4(NUMS.INDEX_ROW);
    expect(mat4.toColMajorArray(m)).toEqual(NUMS.INDEX_ROW);
  });

  test('toRowMajorArray', () => {
    const m = mat4(NUMS.INDEX_ROW);
    expect(mat4.toRowMajorArray(m)).toEqual(NUMS.INDEX_COL);
  });
});

describe('clone', () => {
  test('clone to a new instance', () => {
    const m = mat4(NUMS.INDEX_ROW);
    const result = mat4.clone(m);
    expectMatrix4(result, NUMS.INDEX_ROW);
    expect(result === m).toBe(false);
    expect(result[0] === m[0]).toBe(false);
    expect(result[1] === m[1]).toBe(false);
    expect(result[2] === m[2]).toBe(false);
    expect(result[3] === m[3]).toBe(false);
  });

  test('clone to target instance', () => {
    const m0 = mat4(NUMS.INDEX_ROW);
    const m1 = mat4();
    const result = mat4.clone(m0, m1);
    expectMatrix4(m1, NUMS.INDEX_ROW);
    expect(m1[0] === m0[0]).toBe(false);
    expect(m1[1] === m0[1]).toBe(false);
    expect(m1[2] === m0[2]).toBe(false);
    expect(m1[3] === m0[3]).toBe(false);
    expect(result === m1).toBe(true);
  });
});

describe('equals', () => {
  test('exactly equals', () => {
    const m0 = mat4(NUMS.IDENTITY);

    const m1 = mat4(NUMS.IDENTITY);
    expect(mat4.equals(m0, m1)).toBe(true);

    // prettier-ignore
    const m2 = mat4(
      1, 0, 0, 1,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );
    expect(mat4.equals(m0, m2)).toBe(false);
  });

  test('approximately equals', () => {
    const m0 = mat4(NUMS.IDENTITY);

    // prettier-ignore
    const m1 = mat4(
      1, 0, 0, PRECISION[15],
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );
    expect(mat4.equals(m0, m1, PRECISION[14])).toBe(true);
    expect(mat4.equals(m0, m1, PRECISION[15])).toBe(true);
    expect(mat4.equals(m0, m1, PRECISION[16])).toBe(false);
  });
});
