import { describe, expect, test } from 'vitest';
import { expectMatrix2 } from './matrix2-expect';
import { expectVector2 } from './vector2-expect';
import { Matrix2, PRECISION, mat2, vec2 } from '/src';

describe('create', () => {
  // prettier-ignore
  const elements = [
    1, 0,
    0, 1,
  ];

  test('constructor', () => {
    expectMatrix2(new Matrix2(), elements);

    expectMatrix2(new Matrix2(...elements), elements);

    expectMatrix2(new Matrix2(elements), elements);

    expectMatrix2(new Matrix2(vec2(1, 0), vec2(0, 1)), elements);

    expectMatrix2(new Matrix2(new Matrix2(elements)), elements);
  });

  test('mat2', () => {
    expectMatrix2(mat2(), elements);

    expectMatrix2(mat2(...elements), elements);

    expectMatrix2(mat2(elements), elements);

    expectMatrix2(mat2(vec2(1, 0), vec2(0, 1)), elements);

    expectMatrix2(mat2(mat2(elements)), elements);
  });
});

describe('set elements', () => {
  // prettier-ignore
  const elements = [
    0, 1,
    1, 0,
  ];
  const v0 = vec2(0, 1);
  const v1 = vec2(1, 0);

  test('Matrix2.prototype.set', () => {
    expectMatrix2(mat2().set(...elements), elements);

    expectMatrix2(mat2().set(elements), elements);

    expectMatrix2(mat2().set(vec2(0, 1), vec2(1, 0)), elements);

    expectMatrix2(mat2().set(mat2(elements)), elements);
  });

  test('index setter', () => {
    const m = mat2();
    m[0] = v0;
    m[1] = v1;
    expectMatrix2(m, elements);
    expect(m[0] === v0).toBe(true);
    expect(m[1] === v1).toBe(true);
  });
});

describe('convert to array', () => {
  // prettier-ignore
  const elements = [
    1, 0,
    0, 1,
  ];

  test('iterator', () => {
    const m = mat2();
    const vecs = [...mat2()];
    expectVector2(vecs[0], [...m[0]]);
    expect(vecs[0] === m[0]).toBe(false);
    expectVector2(vecs[1], [...m[1]]);
    expect(vecs[1] === m[1]).toBe(false);
  });

  test('toArray', () => {
    expect(mat2.toArray(mat2())).toEqual(elements);
  });

  test('toColMajorArray', () => {
    expect(mat2.toColMajorArray(mat2())).toEqual(elements);
  });

  test('toRowMajorArray', () => {
    // prettier-ignore
    expect(mat2.toRowMajorArray(mat2())).toEqual([
        elements[0], elements[2],
        elements[1], elements[3],
      ]);
  });
});

describe('clone', () => {
  test('clone to a new instance', () => {
    const m0 = mat2();
    const m1 = mat2.clone(m0);
    expect(m0 === m1).toBe(false);
    expect(m0[0] === m1[0]).toBe(false);
    expect(m0[1] === m1[1]).toBe(false);
    expect(m0.toArray()).toEqual(m1.toArray());
  });

  test('clone to target instance', () => {
    const m0 = mat2(0, 1, 1, 0);
    const m1 = mat2();
    mat2.clone(m0, m1);
    expect(m0 === m1).toBe(false);
    expect(m0[0] === m1[0]).toBe(false);
    expect(m0[1] === m1[1]).toBe(false);
    expect(m0.toArray()).toEqual(m1.toArray());
  });
});

describe('equals', () => {
  test('exactly equals', () => {
    const m0 = mat2();

    const m1 = mat2();
    expect(mat2.equals(m0, m1)).toBe(true);

    const m2 = mat2(0, 1, 1, 0);
    expect(mat2.equals(m0, m2)).toBe(false);
  });

  test('approximately equals', () => {
    const m0 = mat2();

    const m1 = mat2(1, PRECISION[15], 0, 1);
    expect(mat2.equals(m0, m1, PRECISION[14])).toBe(true);
    expect(mat2.equals(m0, m1, PRECISION[15])).toBe(true);
    expect(mat2.equals(m0, m1, PRECISION[16])).toBe(false);
  });
});
