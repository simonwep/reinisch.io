export const createAnimationLoop = (fn: () => void) => {
  let frameId = -1;

  const frame = () => {
    fn();
    frameId = requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
  return () => cancelAnimationFrame(frameId);
};
