import { describe, expect, test } from 'vitest';
import { MAT2_NUMS, expectMatrix2 } from './matrix2-prepare';
import { Matrix2, PRECISION, mat2, vec2 } from '/src';

describe('create', () => {
  test('constructor', () => {
    expectMatrix2(new Matrix2(), MAT2_NUMS.IDENTITY);

    expectMatrix2(new Matrix2(...MAT2_NUMS.INDEX_ROW), MAT2_NUMS.INDEX_ROW);

    expectMatrix2(new Matrix2(MAT2_NUMS.INDEX_ROW), MAT2_NUMS.INDEX_ROW);

    expectMatrix2(
      new Matrix2([
        MAT2_NUMS.INDEX_ROW.slice(0, 2),
        MAT2_NUMS.INDEX_ROW.slice(2, 4),
      ]),
      MAT2_NUMS.INDEX_ROW,
    );

    expectMatrix2(
      new Matrix2(
        vec2(MAT2_NUMS.INDEX_ROW.slice(0, 2)),
        vec2(MAT2_NUMS.INDEX_ROW.slice(2, 4)),
      ),
      MAT2_NUMS.INDEX_ROW,
    );

    expectMatrix2(
      new Matrix2(new Matrix2(MAT2_NUMS.INDEX_ROW)),
      MAT2_NUMS.INDEX_ROW,
    );
  });

  test('mat2', () => {
    expectMatrix2(mat2(), MAT2_NUMS.IDENTITY);

    expectMatrix2(mat2(...MAT2_NUMS.INDEX_ROW), MAT2_NUMS.INDEX_ROW);

    expectMatrix2(mat2(MAT2_NUMS.INDEX_ROW), MAT2_NUMS.INDEX_ROW);

    expectMatrix2(
      mat2([MAT2_NUMS.INDEX_ROW.slice(0, 2), MAT2_NUMS.INDEX_ROW.slice(2, 4)]),
      MAT2_NUMS.INDEX_ROW,
    );

    expectMatrix2(
      mat2(
        vec2(MAT2_NUMS.INDEX_ROW.slice(0, 2)),
        vec2(MAT2_NUMS.INDEX_ROW.slice(2, 4)),
      ),
      MAT2_NUMS.INDEX_ROW,
    );

    expectMatrix2(mat2(mat2(MAT2_NUMS.INDEX_ROW)), MAT2_NUMS.INDEX_ROW);
  });
});

describe('set', () => {
  test('Matrix2.prototype.set', () => {
    expectMatrix2(mat2().set(...MAT2_NUMS.INDEX_ROW), MAT2_NUMS.INDEX_ROW);

    expectMatrix2(mat2().set(MAT2_NUMS.INDEX_ROW), MAT2_NUMS.INDEX_ROW);

    expectMatrix2(
      mat2().set([
        MAT2_NUMS.INDEX_ROW.slice(0, 2),
        MAT2_NUMS.INDEX_ROW.slice(2, 4),
      ]),
      MAT2_NUMS.INDEX_ROW,
    );

    expectMatrix2(
      mat2().set(
        vec2(MAT2_NUMS.INDEX_ROW.slice(0, 2)),
        vec2(MAT2_NUMS.INDEX_ROW.slice(2, 4)),
      ),
      MAT2_NUMS.INDEX_ROW,
    );

    expectMatrix2(mat2().set(mat2(MAT2_NUMS.INDEX_ROW)), MAT2_NUMS.INDEX_ROW);
  });

  test('index setter', () => {
    const m = mat2();
    const v0 = vec2(MAT2_NUMS.INDEX_ROW.slice(0, 2));
    const v1 = vec2(MAT2_NUMS.INDEX_ROW.slice(2, 4));
    m[0] = v0;
    m[1] = v1;
    expectMatrix2(m, MAT2_NUMS.INDEX_ROW);
    expect(m[0]).not.toBe(v0);
    expect(m[1]).not.toBe(v1);
  });
});

describe('convert to array', () => {
  test('iterator', () => {
    const m = mat2();
    const vecs = [...m];
    expect(vecs[0]).toBe(m[0]);
    expect(vecs[1]).toBe(m[1]);
  });

  test('toArray', () => {
    const m = mat2(MAT2_NUMS.INDEX_ROW);
    expect(mat2.toArray(m)).toEqual(MAT2_NUMS.INDEX_ROW);
  });

  test('toArray2D', () => {
    const m = mat2(MAT2_NUMS.INDEX_ROW);
    const result = mat2.toArray2D(m);
    expect(result[0]).toEqual(MAT2_NUMS.INDEX_ROW.slice(0, 2));
    expect(result[1]).toEqual(MAT2_NUMS.INDEX_ROW.slice(2, 4));
  });

  test('toColMajorArray', () => {
    const m = mat2(MAT2_NUMS.INDEX_ROW);
    expect(mat2.toColMajorArray(m)).toEqual(MAT2_NUMS.INDEX_ROW);
  });

  test('toColMajorArray2D', () => {
    const m = mat2(MAT2_NUMS.INDEX_ROW);
    const result = mat2.toColMajorArray2D(m);
    expect(result[0]).toEqual(MAT2_NUMS.INDEX_ROW.slice(0, 2));
    expect(result[1]).toEqual(MAT2_NUMS.INDEX_ROW.slice(2, 4));
  });

  test('toRowMajorArray', () => {
    const m = mat2(MAT2_NUMS.INDEX_ROW);
    expect(mat2.toRowMajorArray(m)).toEqual(MAT2_NUMS.INDEX_COL);
  });

  test('toRowMajorArray2D', () => {
    const m = mat2(MAT2_NUMS.INDEX_ROW);
    const result = mat2.toRowMajorArray2D(m);
    expect(result[0]).toEqual(MAT2_NUMS.INDEX_COL.slice(0, 2));
    expect(result[1]).toEqual(MAT2_NUMS.INDEX_COL.slice(2, 4));
  });
});

describe('clone', () => {
  test('clone to a new instance', () => {
    const m = mat2(MAT2_NUMS.INDEX_ROW);
    const result = mat2.clone(m);
    expectMatrix2(result, MAT2_NUMS.INDEX_ROW);
    expect(result).not.toBe(m);
    expect(result[0]).not.toBe(m[0]);
    expect(result[1]).not.toBe(m[1]);
  });

  test('clone to target instance', () => {
    const m0 = mat2(MAT2_NUMS.INDEX_ROW);
    const m1 = mat2();
    const result = mat2.clone(m0, m1);
    expectMatrix2(m1, MAT2_NUMS.INDEX_ROW);
    expect(m1[0]).not.toBe(m0[0]);
    expect(m1[1]).not.toBe(m0[1]);
    expect(result).toBe(m1);
  });
});

describe('equals', () => {
  test('exactly equals', () => {
    const m0 = mat2(MAT2_NUMS.IDENTITY);

    const m1 = mat2(MAT2_NUMS.IDENTITY);
    expect(mat2.equals(m0, m1)).toBe(true);

    // prettier-ignore
    const m2 = mat2(
      1, 1,
      0, 1,
    );
    expect(mat2.equals(m0, m2)).toBe(false);
  });

  test('approximately equals', () => {
    const m0 = mat2();

    // prettier-ignore
    const m1 = mat2(
      1, PRECISION[15],
      0, 1,
    );
    expect(mat2.equals(m0, m1, PRECISION[14])).toBe(true);
    expect(mat2.equals(m0, m1, PRECISION[15])).toBe(true);
    expect(mat2.equals(m0, m1, PRECISION[16])).toBe(false);
  });
});
