import { describe, expect, test } from 'vitest';
import { expectMatrix2 } from './matrix2-expect';
import { Matrix2, mat2, vec2 } from '/src';

describe('matrix2', () => {
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

      expectMatrix2(mat2(new Matrix2(elements)), elements);
    });
  });
});
