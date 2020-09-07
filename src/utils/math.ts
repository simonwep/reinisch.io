/**
 * Clamps a value between an upper and lower bound
 * @param v value
 * @param min minimum value
 * @param max maximum value
 */
export const clamp = (v: number, min: number, max: number): number => {
    return Math.min(Math.max(v, min), max);
};
