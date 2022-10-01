import { random } from '@utils/math';

export type Range = [number, number];

export const createTicks = (cb: () => void | Range, range: Range) => {
  let currentRange = range;
  let id = -1;

  const tick = () => {
    currentRange = cb() ?? range;
    id = window.setTimeout(tick, random(...currentRange));
  };

  id = window.setTimeout(tick, random(...currentRange));
  return () => clearTimeout(id);
};
