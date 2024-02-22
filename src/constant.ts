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

export interface Extent {
  left: number;
  right: number;
  bottom: number;
  top: number;
  near: number;
  far: number;
}

const CLIP_WEBGL: Extent = {
  left: -1,
  right: 1,
  bottom: -1,
  top: 1,
  near: -1,
  far: 1,
};
const CLIP_WEBGPU: Extent = {
  left: -1,
  right: 1,
  bottom: -1,
  top: 1,
  near: 0,
  far: 1,
};

export const CLIP = {
  WEBGL: CLIP_WEBGL,
  WEBGPU: CLIP_WEBGPU,
};
