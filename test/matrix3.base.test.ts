import { describe, expect, test } from 'vitest';
import { MAT3_NUMS, expectMatrix3 } from './matrix3-prepare';
import { Matrix3, PRECISION, mat3, vec3 } from '/src';

describe('create', () => {
  test('constructor', () => {
    expectMatrix3(new Matrix3(), MAT3_NUMS.IDENTITY);

    expectMatrix3(new Matrix3(...MAT3_NUMS.INDEX_ROW), MAT3_NUMS.INDEX_ROW);

    expectMatrix3(new Matrix3(MAT3_NUMS.INDEX_ROW), MAT3_NUMS.INDEX_ROW);

    expectMatrix3(
      new Matrix3([
        MAT3_NUMS.INDEX_ROW.slice(0, 3),
        MAT3_NUMS.INDEX_ROW.slice(3, 6),
        MAT3_NUMS.INDEX_ROW.slice(6, 9),
      ]),
      MAT3_NUMS.INDEX_ROW,
    );

    expectMatrix3(
      new Matrix3(
        vec3(MAT3_NUMS.INDEX_ROW.slice(0, 3)),
        vec3(MAT3_NUMS.INDEX_ROW.slice(3, 6)),
        vec3(MAT3_NUMS.INDEX_ROW.slice(6, 9)),
      ),
      MAT3_NUMS.INDEX_ROW,
    );

    expectMatrix3(
      new Matrix3(new Matrix3(MAT3_NUMS.INDEX_ROW)),
      MAT3_NUMS.INDEX_ROW,
    );
  });

  test('mat3', () => {
    expectMatrix3(mat3(), MAT3_NUMS.IDENTITY);

    expectMatrix3(mat3(...MAT3_NUMS.INDEX_ROW), MAT3_NUMS.INDEX_ROW);

    expectMatrix3(mat3(MAT3_NUMS.INDEX_ROW), MAT3_NUMS.INDEX_ROW);

    expectMatrix3(
      mat3([
        MAT3_NUMS.INDEX_ROW.slice(0, 3),
        MAT3_NUMS.INDEX_ROW.slice(3, 6),
        MAT3_NUMS.INDEX_ROW.slice(6, 9),
      ]),
      MAT3_NUMS.INDEX_ROW,
    );

    expectMatrix3(
      mat3(
        vec3(MAT3_NUMS.INDEX_ROW.slice(0, 3)),
        vec3(MAT3_NUMS.INDEX_ROW.slice(3, 6)),
        vec3(MAT3_NUMS.INDEX_ROW.slice(6, 9)),
      ),
      MAT3_NUMS.INDEX_ROW,
    );

    expectMatrix3(mat3(mat3(MAT3_NUMS.INDEX_ROW)), MAT3_NUMS.INDEX_ROW);
  });
});

describe('set', () => {
  test('Matrix3.prototype.set', () => {
    expectMatrix3(mat3().set(...MAT3_NUMS.INDEX_ROW), MAT3_NUMS.INDEX_ROW);

    expectMatrix3(mat3().set(MAT3_NUMS.INDEX_ROW), MAT3_NUMS.INDEX_ROW);

    expectMatrix3(
      mat3().set([
        MAT3_NUMS.INDEX_ROW.slice(0, 3),
        MAT3_NUMS.INDEX_ROW.slice(3, 6),
        MAT3_NUMS.INDEX_ROW.slice(6, 9),
      ]),
      MAT3_NUMS.INDEX_ROW,
    );

    expectMatrix3(
      mat3().set(
        vec3(MAT3_NUMS.INDEX_ROW.slice(0, 3)),
        vec3(MAT3_NUMS.INDEX_ROW.slice(3, 6)),
        vec3(MAT3_NUMS.INDEX_ROW.slice(6, 9)),
      ),
      MAT3_NUMS.INDEX_ROW,
    );

    expectMatrix3(mat3().set(mat3(MAT3_NUMS.INDEX_ROW)), MAT3_NUMS.INDEX_ROW);
  });

  test('index setter', () => {
    const m = mat3();
    const v0 = vec3(MAT3_NUMS.INDEX_ROW.slice(0, 3));
    const v1 = vec3(MAT3_NUMS.INDEX_ROW.slice(3, 6));
    const v2 = vec3(MAT3_NUMS.INDEX_ROW.slice(6, 9));
    m[0] = v0;
    m[1] = v1;
    m[2] = v2;
    expectMatrix3(m, MAT3_NUMS.INDEX_ROW);
    expect(m[0]).not.toBe(v0);
    expect(m[1]).not.toBe(v1);
    expect(m[2]).not.toBe(v2);
  });
});

describe('convert to array', () => {
  test('iterator', () => {
    const m = mat3();
    const vecs = [...m];
    expect(vecs[0]).toBe(m[0]);
    expect(vecs[1]).toBe(m[1]);
    expect(vecs[2]).toBe(m[2]);
  });

  test('toArray', () => {
    const m = mat3(MAT3_NUMS.INDEX_ROW);
    expect(m.toArray()).toEqual(MAT3_NUMS.INDEX_ROW);
    expect(mat3.toArray(m)).toEqual(MAT3_NUMS.INDEX_ROW);
  });

  test('toColMajorArray', () => {
    const m = mat3(MAT3_NUMS.INDEX_ROW);
    expect(m.toColMajorArray()).toEqual(MAT3_NUMS.INDEX_ROW);
    expect(mat3.toColMajorArray(m)).toEqual(MAT3_NUMS.INDEX_ROW);
  });

  test('toRowMajorArray', () => {
    const m = mat3(MAT3_NUMS.INDEX_ROW);
    expect(m.toRowMajorArray()).toEqual(MAT3_NUMS.INDEX_COL);
    expect(mat3.toRowMajorArray(m)).toEqual(MAT3_NUMS.INDEX_COL);
  });

  test('toArray2D', () => {
    const m = mat3(MAT3_NUMS.INDEX_ROW);
    const result = m.toArray2D();
    expect(result[0]).toEqual(MAT3_NUMS.INDEX_ROW.slice(0, 3));
    expect(result[1]).toEqual(MAT3_NUMS.INDEX_ROW.slice(3, 6));
    expect(result[2]).toEqual(MAT3_NUMS.INDEX_ROW.slice(6, 9));
    expect(mat3.toArray2D(m)).toEqual(result);
  });

  test('toColMajorArray2D', () => {
    const m = mat3(MAT3_NUMS.INDEX_ROW);
    const result = m.toColMajorArray2D();
    expect(result[0]).toEqual(MAT3_NUMS.INDEX_ROW.slice(0, 3));
    expect(result[1]).toEqual(MAT3_NUMS.INDEX_ROW.slice(3, 6));
    expect(result[2]).toEqual(MAT3_NUMS.INDEX_ROW.slice(6, 9));
    expect(mat3.toColMajorArray2D(m)).toEqual(result);
  });

  test('toRowMajorArray2D', () => {
    const m = mat3(MAT3_NUMS.INDEX_ROW);
    const result = m.toRowMajorArray2D();
    expect(result[0]).toEqual(MAT3_NUMS.INDEX_COL.slice(0, 3));
    expect(result[1]).toEqual(MAT3_NUMS.INDEX_COL.slice(3, 6));
    expect(result[2]).toEqual(MAT3_NUMS.INDEX_COL.slice(6, 9));
    expect(mat3.toRowMajorArray2D(m)).toEqual(result);
  });
});

describe('clone', () => {
  test('clone to a new instance', () => {
    const m = mat3(MAT3_NUMS.INDEX_ROW);
    const result = mat3.clone(m);
    expectMatrix3(result, m.toArray());
    expect(result).not.toBe(m);
    expect(result[0]).not.toBe(m[0]);
    expect(result[1]).not.toBe(m[1]);
    expect(result[2]).not.toBe(m[2]);
  });

  test('clone to target instance', () => {
    const m0 = mat3(MAT3_NUMS.INDEX_ROW);
    const m1 = mat3();
    const result = mat3.clone(m0, m1);
    expectMatrix3(m1, MAT3_NUMS.INDEX_ROW);
    expect(m1[0]).not.toBe(m0[0]);
    expect(m1[1]).not.toBe(m0[1]);
    expect(m1[2]).not.toBe(m0[2]);
    expect(result).toBe(m1);
  });
});

describe('equals', () => {
  test('exactly equals', () => {
    const m0 = mat3(MAT3_NUMS.IDENTITY);

    const m1 = mat3(MAT3_NUMS.IDENTITY);
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
    const m0 = mat3(MAT3_NUMS.IDENTITY);

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
