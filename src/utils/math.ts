export const clamp = (v: number, min: number, max: number): number => {
  return Math.min(Math.max(v, min), max);
};

export const random = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const step = (v: number, start: number, end = 1) => {
  return clamp((v - start) / (end - start), 0, 1);
};
