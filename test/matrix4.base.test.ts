import { describe, expect, test } from 'vitest';
import { MAT4_NUMS, expectMatrix4 } from './matrix4-prepare';
import { Matrix4, PRECISION, mat4, vec4 } from '/src';

describe('create', () => {
  test('constructor', () => {
    expectMatrix4(new Matrix4(), MAT4_NUMS.IDENTITY);

    expectMatrix4(new Matrix4(...MAT4_NUMS.INDEX_ROW), MAT4_NUMS.INDEX_ROW);

    expectMatrix4(new Matrix4(MAT4_NUMS.INDEX_ROW), MAT4_NUMS.INDEX_ROW);

    expectMatrix4(
      new Matrix4([
        MAT4_NUMS.INDEX_ROW.slice(0, 4),
        MAT4_NUMS.INDEX_ROW.slice(4, 8),
        MAT4_NUMS.INDEX_ROW.slice(8, 12),
        MAT4_NUMS.INDEX_ROW.slice(12, 16),
      ]),
      MAT4_NUMS.INDEX_ROW,
    );

    expectMatrix4(
      new Matrix4(
        vec4(MAT4_NUMS.INDEX_ROW.slice(0, 4)),
        vec4(MAT4_NUMS.INDEX_ROW.slice(4, 8)),
        vec4(MAT4_NUMS.INDEX_ROW.slice(8, 12)),
        vec4(MAT4_NUMS.INDEX_ROW.slice(12, 16)),
      ),
      MAT4_NUMS.INDEX_ROW,
    );

    expectMatrix4(
      new Matrix4(new Matrix4(MAT4_NUMS.INDEX_ROW)),
      MAT4_NUMS.INDEX_ROW,
    );
  });

  test('mat4', () => {
    expectMatrix4(mat4(), MAT4_NUMS.IDENTITY);

    expectMatrix4(mat4(...MAT4_NUMS.INDEX_ROW), MAT4_NUMS.INDEX_ROW);

    expectMatrix4(mat4(MAT4_NUMS.INDEX_ROW), MAT4_NUMS.INDEX_ROW);

    expectMatrix4(
      mat4([
        MAT4_NUMS.INDEX_ROW.slice(0, 4),
        MAT4_NUMS.INDEX_ROW.slice(4, 8),
        MAT4_NUMS.INDEX_ROW.slice(8, 12),
        MAT4_NUMS.INDEX_ROW.slice(12, 16),
      ]),
      MAT4_NUMS.INDEX_ROW,
    );

    expectMatrix4(
      mat4(
        vec4(MAT4_NUMS.INDEX_ROW.slice(0, 4)),
        vec4(MAT4_NUMS.INDEX_ROW.slice(4, 8)),
        vec4(MAT4_NUMS.INDEX_ROW.slice(8, 12)),
        vec4(MAT4_NUMS.INDEX_ROW.slice(12, 16)),
      ),
      MAT4_NUMS.INDEX_ROW,
    );

    expectMatrix4(mat4(mat4(MAT4_NUMS.INDEX_ROW)), MAT4_NUMS.INDEX_ROW);
  });
});

describe('set', () => {
  test('Matrix4.prototype.set', () => {
    expectMatrix4(mat4().set(...MAT4_NUMS.INDEX_ROW), MAT4_NUMS.INDEX_ROW);

    expectMatrix4(mat4().set(MAT4_NUMS.INDEX_ROW), MAT4_NUMS.INDEX_ROW);

    expectMatrix4(
      mat4().set([
        MAT4_NUMS.INDEX_ROW.slice(0, 4),
        MAT4_NUMS.INDEX_ROW.slice(4, 8),
        MAT4_NUMS.INDEX_ROW.slice(8, 12),
        MAT4_NUMS.INDEX_ROW.slice(12, 16),
      ]),
      MAT4_NUMS.INDEX_ROW,
    );

    expectMatrix4(
      mat4().set(
        vec4(MAT4_NUMS.INDEX_ROW.slice(0, 4)),
        vec4(MAT4_NUMS.INDEX_ROW.slice(4, 8)),
        vec4(MAT4_NUMS.INDEX_ROW.slice(8, 12)),
        vec4(MAT4_NUMS.INDEX_ROW.slice(12, 16)),
      ),
      MAT4_NUMS.INDEX_ROW,
    );

    expectMatrix4(mat4().set(mat4(MAT4_NUMS.INDEX_ROW)), MAT4_NUMS.INDEX_ROW);
  });

  test('index setter', () => {
    const m = mat4();
    const v0 = vec4(MAT4_NUMS.INDEX_ROW.slice(0, 4));
    const v1 = vec4(MAT4_NUMS.INDEX_ROW.slice(4, 8));
    const v2 = vec4(MAT4_NUMS.INDEX_ROW.slice(8, 12));
    const v3 = vec4(MAT4_NUMS.INDEX_ROW.slice(12, 16));
    m[0] = v0;
    m[1] = v1;
    m[2] = v2;
    m[3] = v3;
    expectMatrix4(m, MAT4_NUMS.INDEX_ROW);
    expect(m[0]).not.toBe(v0);
    expect(m[1]).not.toBe(v1);
    expect(m[2]).not.toBe(v2);
    expect(m[3]).not.toBe(v3);
  });
});

describe('convert to array', () => {
  test('iterator', () => {
    const m = mat4();
    const vecs = [...m];
    expect(vecs[0]).toBe(m[0]);
    expect(vecs[1]).toBe(m[1]);
    expect(vecs[2]).toBe(m[2]);
    expect(vecs[3]).toBe(m[3]);
  });

  test('toArray', () => {
    const m = mat4(MAT4_NUMS.INDEX_ROW);
    expect(mat4.toArray(m)).toEqual(MAT4_NUMS.INDEX_ROW);
  });

  test('toArray2D', () => {
    const m = mat4(MAT4_NUMS.INDEX_ROW);
    const result = mat4.toArray2D(m);
    expect(result[0]).toEqual(MAT4_NUMS.INDEX_ROW.slice(0, 4));
    expect(result[1]).toEqual(MAT4_NUMS.INDEX_ROW.slice(4, 8));
    expect(result[2]).toEqual(MAT4_NUMS.INDEX_ROW.slice(8, 12));
    expect(result[3]).toEqual(MAT4_NUMS.INDEX_ROW.slice(12, 16));
  });

  test('toColMajorArray', () => {
    const m = mat4(MAT4_NUMS.INDEX_ROW);
    expect(mat4.toColMajorArray(m)).toEqual(MAT4_NUMS.INDEX_ROW);
  });

  test('toColMajorArray2D', () => {
    const m = mat4(MAT4_NUMS.INDEX_ROW);
    const result = mat4.toColMajorArray2D(m);
    expect(result[0]).toEqual(MAT4_NUMS.INDEX_ROW.slice(0, 4));
    expect(result[1]).toEqual(MAT4_NUMS.INDEX_ROW.slice(4, 8));
    expect(result[2]).toEqual(MAT4_NUMS.INDEX_ROW.slice(8, 12));
    expect(result[3]).toEqual(MAT4_NUMS.INDEX_ROW.slice(12, 16));
  });

  test('toRowMajorArray', () => {
    const m = mat4(MAT4_NUMS.INDEX_ROW);
    expect(mat4.toRowMajorArray(m)).toEqual(MAT4_NUMS.INDEX_COL);
  });

  test('toRowMajorArray2D', () => {
    const m = mat4(MAT4_NUMS.INDEX_ROW);
    const result = mat4.toRowMajorArray2D(m);
    expect(result[0]).toEqual(MAT4_NUMS.INDEX_COL.slice(0, 4));
    expect(result[1]).toEqual(MAT4_NUMS.INDEX_COL.slice(4, 8));
    expect(result[2]).toEqual(MAT4_NUMS.INDEX_COL.slice(8, 12));
    expect(result[3]).toEqual(MAT4_NUMS.INDEX_COL.slice(12, 16));
  });
});

describe('clone', () => {
  test('clone to a new instance', () => {
    const m = mat4(MAT4_NUMS.INDEX_ROW);
    const result = mat4.clone(m);
    expectMatrix4(result, MAT4_NUMS.INDEX_ROW);
    expect(result).not.toBe(m);
    expect(result[0]).not.toBe(m[0]);
    expect(result[1]).not.toBe(m[1]);
    expect(result[2]).not.toBe(m[2]);
    expect(result[3]).not.toBe(m[3]);
  });

  test('clone to target instance', () => {
    const m0 = mat4(MAT4_NUMS.INDEX_ROW);
    const m1 = mat4();
    const result = mat4.clone(m0, m1);
    expectMatrix4(m1, MAT4_NUMS.INDEX_ROW);
    expect(m1[0]).not.toBe(m0[0]);
    expect(m1[1]).not.toBe(m0[1]);
    expect(m1[2]).not.toBe(m0[2]);
    expect(m1[3]).not.toBe(m0[3]);
    expect(result).toBe(m1);
  });
});

describe('equals', () => {
  test('exactly equals', () => {
    const m0 = mat4(MAT4_NUMS.IDENTITY);

    const m1 = mat4(MAT4_NUMS.IDENTITY);
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
    const m0 = mat4(MAT4_NUMS.IDENTITY);

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
