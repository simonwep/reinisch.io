const easeInOut = (k: number) => 0.5 * (Math.sin((k - 0.5) * Math.PI) + 1);

export const scrollTop = (top: number, element = document.scrollingElement ?? undefined, ticks = 60) => {
  if (!element) {
    return () => void 0;
  }

  const { scrollTop } = element;
  const invert = top > scrollTop;
  let frame = -1;
  let tick = 0;

  const onFrame = () => {
    if (tick++ > ticks) {
      element.scrollTop = top;
      return;
    }

    element.scrollTop = invert
      ? easeInOut(tick / ticks) * top
      : scrollTop - easeInOut(tick / ticks) * (scrollTop - top);

    frame = requestAnimationFrame(onFrame);
  };

  frame = requestAnimationFrame(onFrame);
  return () => cancelAnimationFrame(frame);
};
