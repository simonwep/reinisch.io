export interface Position {
  x: number;
  y: number;
}

const isTouchEvent = (evt: PointerEvent | TouchEvent): evt is TouchEvent => {
  return evt.type.startsWith('touch');
};

export const getPosition = (evt: PointerEvent | TouchEvent): Position => {
  const tap = isTouchEvent(evt) ? evt.touches[0] : evt;
  return { x: tap.clientX * devicePixelRatio, y: tap.clientY * devicePixelRatio };
};
