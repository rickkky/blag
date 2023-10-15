import { describe, expect, test } from 'vitest';
import { expectMatrix2 } from './matrix2-expect';
import { NUMS } from './matrix2-sample';
import { Matrix2, PRECISION, mat2, vec2 } from '/src';

describe('create', () => {
  test('constructor', () => {
    expectMatrix2(new Matrix2(), NUMS.IDENTITY);

    expectMatrix2(new Matrix2(...NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix2(new Matrix2(NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix2(
      new Matrix2([NUMS.INDEX_ROW.slice(0, 2), NUMS.INDEX_ROW.slice(2, 4)]),
      NUMS.INDEX_ROW,
    );

    expectMatrix2(
      new Matrix2(
        vec2(NUMS.INDEX_ROW.slice(0, 2)),
        vec2(NUMS.INDEX_ROW.slice(2, 4)),
      ),
      NUMS.INDEX_ROW,
    );

    expectMatrix2(new Matrix2(new Matrix2(NUMS.INDEX_ROW)), NUMS.INDEX_ROW);
  });

  test('mat2', () => {
    expectMatrix2(mat2(), NUMS.IDENTITY);

    expectMatrix2(mat2(...NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix2(mat2(NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix2(
      mat2([NUMS.INDEX_ROW.slice(0, 2), NUMS.INDEX_ROW.slice(2, 4)]),
      NUMS.INDEX_ROW,
    );

    expectMatrix2(
      mat2(vec2(NUMS.INDEX_ROW.slice(0, 2)), vec2(NUMS.INDEX_ROW.slice(2, 4))),
      NUMS.INDEX_ROW,
    );

    expectMatrix2(mat2(mat2(NUMS.INDEX_ROW)), NUMS.INDEX_ROW);
  });
});

describe('set', () => {
  test('Matrix2.prototype.set', () => {
    expectMatrix2(mat2().set(...NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix2(mat2().set(NUMS.INDEX_ROW), NUMS.INDEX_ROW);

    expectMatrix2(
      mat2().set([NUMS.INDEX_ROW.slice(0, 2), NUMS.INDEX_ROW.slice(2, 4)]),
      NUMS.INDEX_ROW,
    );

    expectMatrix2(
      mat2().set(
        vec2(NUMS.INDEX_ROW.slice(0, 2)),
        vec2(NUMS.INDEX_ROW.slice(2, 4)),
      ),
      NUMS.INDEX_ROW,
    );

    expectMatrix2(mat2().set(mat2(NUMS.INDEX_ROW)), NUMS.INDEX_ROW);
  });

  test('index setter', () => {
    const m = mat2();
    const v0 = vec2(NUMS.INDEX_ROW.slice(0, 2));
    const v1 = vec2(NUMS.INDEX_ROW.slice(2, 4));
    m[0] = v0;
    m[1] = v1;
    expectMatrix2(m, NUMS.INDEX_ROW);
    expect(m[0] === v0).toBe(false);
    expect(m[1] === v1).toBe(false);
  });
});

describe('convert to array', () => {
  test('iterator', () => {
    const m = mat2();
    const vecs = [...m];
    expect(vecs[0] === m[0]).toBe(true);
    expect(vecs[1] === m[1]).toBe(true);
  });

  test('toArray', () => {
    const m = mat2(NUMS.INDEX_ROW);
    expect(mat2.toArray(m)).toEqual(NUMS.INDEX_ROW);
  });

  test('toArray2D', () => {
    const m = mat2(NUMS.INDEX_ROW);
    const result = mat2.toArray2D(m);
    expect(result[0]).toEqual(NUMS.INDEX_ROW.slice(0, 2));
    expect(result[1]).toEqual(NUMS.INDEX_ROW.slice(2, 4));
  });

  test('toColMajorArray', () => {
    const m = mat2(NUMS.INDEX_ROW);
    expect(mat2.toColMajorArray(m)).toEqual(NUMS.INDEX_ROW);
  });

  test('toColMajorArray2D', () => {
    const m = mat2(NUMS.INDEX_ROW);
    const result = mat2.toColMajorArray2D(m);
    expect(result[0]).toEqual(NUMS.INDEX_ROW.slice(0, 2));
    expect(result[1]).toEqual(NUMS.INDEX_ROW.slice(2, 4));
  });

  test('toRowMajorArray', () => {
    const m = mat2(NUMS.INDEX_ROW);
    expect(mat2.toRowMajorArray(m)).toEqual(NUMS.INDEX_COL);
  });

  test('toRowMajorArray2D', () => {
    const m = mat2(NUMS.INDEX_ROW);
    const result = mat2.toRowMajorArray2D(m);
    expect(result[0]).toEqual(NUMS.INDEX_COL.slice(0, 2));
    expect(result[1]).toEqual(NUMS.INDEX_COL.slice(2, 4));
  });
});

describe('clone', () => {
  test('clone to a new instance', () => {
    const m = mat2(NUMS.INDEX_ROW);
    const result = mat2.clone(m);
    expectMatrix2(result, NUMS.INDEX_ROW);
    expect(result === m).toBe(false);
    expect(result[0] === m[0]).toBe(false);
    expect(result[1] === m[1]).toBe(false);
  });

  test('clone to target instance', () => {
    const m0 = mat2(NUMS.INDEX_ROW);
    const m1 = mat2();
    const result = mat2.clone(m0, m1);
    expectMatrix2(m1, NUMS.INDEX_ROW);
    expect(m1[0] === m0[0]).toBe(false);
    expect(m1[1] === m0[1]).toBe(false);
    expect(result === m1).toBe(true);
  });
});

describe('equals', () => {
  test('exactly equals', () => {
    const m0 = mat2(NUMS.IDENTITY);

    const m1 = mat2(NUMS.IDENTITY);
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
