import { describe, expect, test } from 'vitest';
import { expectMatrix3 } from './matrix3-expect';
import { NUMS } from './matrix3-sample';
import { Matrix3, PRECISION, mat3, vec3 } from '/src';

describe('create', () => {
  const v0 = vec3(NUMS.INDEX_ROW.slice(0, 3));
  const v1 = vec3(NUMS.INDEX_ROW.slice(3, 6));
  const v2 = vec3(NUMS.INDEX_ROW.slice(6, 9));

  test('constructor', () => {
    expectMatrix3(new Matrix3(), NUMS.IDENTITY);

    expectMatrix3(new Matrix3(...NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix3(new Matrix3(NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix3(new Matrix3(v0, v1, v2), NUMS.INDEX_ROW);

    expectMatrix3(new Matrix3(new Matrix3(NUMS.INDEX_ROW)), NUMS.INDEX_ROW);
  });

  test('mat3', () => {
    expectMatrix3(mat3(), NUMS.IDENTITY);

    expectMatrix3(mat3(...NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix3(mat3(NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix3(mat3(v0, v1, v2), NUMS.INDEX_ROW);

    expectMatrix3(mat3(mat3(NUMS.INDEX_ROW)), NUMS.INDEX_ROW);
  });
});

describe('set', () => {
  const v0 = vec3(NUMS.INDEX_ROW.slice(0, 3));
  const v1 = vec3(NUMS.INDEX_ROW.slice(3, 6));
  const v2 = vec3(NUMS.INDEX_ROW.slice(6, 9));

  test('Matrix3.prototype.set', () => {
    expectMatrix3(mat3().set(...NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix3(mat3().set(NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix3(mat3().set(v0, v1, v2), NUMS.INDEX_ROW);

    expectMatrix3(mat3().set(mat3(NUMS.INDEX_ROW)), NUMS.INDEX_ROW);
  });

  test('index setter', () => {
    const m = mat3();
    m[0] = v0;
    m[1] = v1;
    m[2] = v2;
    expectMatrix3(m, NUMS.INDEX_ROW);
    expect(m[0] === v0).toBe(false);
    expect(m[1] === v1).toBe(false);
    expect(m[2] === v2).toBe(false);
  });
});

describe('convert to array', () => {
  test('iterator', () => {
    const m = mat3();
    const vecs = [...m];
    expect(vecs[0] === m[0]).toBe(true);
    expect(vecs[1] === m[1]).toBe(true);
    expect(vecs[2] === m[2]).toBe(true);
  });

  test('toArray', () => {
    const m = mat3(NUMS.INDEX_ROW);
    expect(mat3.toArray(m)).toEqual(NUMS.INDEX_ROW);
  });

  test('toArray2D', () => {
    const m = mat3(NUMS.INDEX_ROW);
    const result = mat3.toArray2D(m);
    expect(result[0]).toEqual(NUMS.INDEX_ROW.slice(0, 3));
    expect(result[1]).toEqual(NUMS.INDEX_ROW.slice(3, 6));
    expect(result[2]).toEqual(NUMS.INDEX_ROW.slice(6, 9));
  });

  test('toColMajorArray', () => {
    const m = mat3(NUMS.INDEX_ROW);
    expect(mat3.toColMajorArray(m)).toEqual(NUMS.INDEX_ROW);
  });

  test('toColMajorArray2D', () => {
    const m = mat3(NUMS.INDEX_ROW);
    const result = mat3.toColMajorArray2D(m);
    expect(result[0]).toEqual(NUMS.INDEX_ROW.slice(0, 3));
    expect(result[1]).toEqual(NUMS.INDEX_ROW.slice(3, 6));
    expect(result[2]).toEqual(NUMS.INDEX_ROW.slice(6, 9));
  });

  test('toRowMajorArray', () => {
    const m = mat3(NUMS.INDEX_ROW);
    expect(mat3.toRowMajorArray(m)).toEqual(NUMS.INDEX_COL);
  });

  test('toRowMajorArray2D', () => {
    const m = mat3(NUMS.INDEX_ROW);
    const result = mat3.toRowMajorArray2D(m);
    expect(result[0]).toEqual(NUMS.INDEX_COL.slice(0, 3));
    expect(result[1]).toEqual(NUMS.INDEX_COL.slice(3, 6));
    expect(result[2]).toEqual(NUMS.INDEX_COL.slice(6, 9));
  });
});

describe('clone', () => {
  test('clone to a new instance', () => {
    const m = mat3(NUMS.INDEX_ROW);
    const result = mat3.clone(m);
    expectMatrix3(result, m.toArray());
    expect(result === m).toBe(false);
    expect(result[0] === m[0]).toBe(false);
    expect(result[1] === m[1]).toBe(false);
    expect(result[2] === m[2]).toBe(false);
  });

  test('clone to target instance', () => {
    const m0 = mat3(NUMS.INDEX_ROW);
    const m1 = mat3();
    const result = mat3.clone(m0, m1);
    expectMatrix3(m1, NUMS.INDEX_ROW);
    expect(m1[0] === m0[0]).toBe(false);
    expect(m1[1] === m0[1]).toBe(false);
    expect(m1[2] === m0[2]).toBe(false);
    expect(result === m1).toBe(true);
  });
});

describe('equals', () => {
  test('exactly equals', () => {
    const m0 = mat3(NUMS.IDENTITY);

    const m1 = mat3(NUMS.IDENTITY);
    expect(mat3.equals(m0, m1)).toBe(true);

    // prettier-ignore
    const m2 = mat3(
      1, 0, 1,
      0, 1, 0,
      0, 0, 1,
    );
    expect(mat3.equals(m0, m2)).toBe(false);
  });

  test('approximately equals', () => {
    const m0 = mat3(NUMS.IDENTITY);

    // prettier-ignore
    const m1 = mat3(
      1, 0, PRECISION[15],
      0, 1, 0,
      0, 0, 1,
    );
    expect(mat3.equals(m0, m1, PRECISION[14])).toBe(true);
    expect(mat3.equals(m0, m1, PRECISION[15])).toBe(true);
    expect(mat3.equals(m0, m1, PRECISION[16])).toBe(false);
  });
});
