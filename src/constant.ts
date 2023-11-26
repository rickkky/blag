// prettier-ignore
export const PRECISION = [
  1,
  1e-1,
  1e-2,
  1e-3,
  1e-4,
  1e-5,
  1e-6,
  1e-7,
  1e-8,
  1e-9,
  1e-10,
  1e-11,
  1e-12,
  1e-13,
  1e-14,
  1e-15,
  1e-16,
  1e-17,
  1e-18,
  1e-19,
  1e-20,
  1e-21,
];

export interface BoundingBox {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  zMin: number;
  zMax: number;
}

export const CLIP = {
  WEBGL: {
    xMin: -1,
    xMax: 1,
    yMin: -1,
    yMax: 1,
    zMin: -1,
    zMax: 1,
  },
  WEBGPU: {
    xMin: -1,
    xMax: 1,
    yMin: -1,
    yMax: 1,
    zMin: 0,
    zMax: 1,
  },
};
