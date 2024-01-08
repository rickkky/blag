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
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  zmin: number;
  zmax: number;
}

const CLIP_WEBGL: BoundingBox = {
  xmin: -1,
  xmax: 1,
  ymin: -1,
  ymax: 1,
  zmin: -1,
  zmax: 1,
};
const CLIP_WEBGPU: BoundingBox = {
  xmin: -1,
  xmax: 1,
  ymin: -1,
  ymax: 1,
  zmin: 0,
  zmax: 1,
};
export const CLIP = {
  WEBGL: CLIP_WEBGL,
  WEBGPU: CLIP_WEBGPU,
};
