import { expect } from 'vitest';
import { expectVector2 } from './vector2-expect';
import { Matrix2 } from '/src/matrix2';

export const expectMatrix2 = (m: Matrix2, elements: number[]) => {
  expect(m.dimension).toBe(2);
  expectVector2(m[0], [elements[0], elements[1]]);
  expectVector2(m[1], [elements[2], elements[3]]);
};
