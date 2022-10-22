import { useScreenSize } from '@hooks';
import { resolveRealCanvasSize } from '@utils/canvas';
import { getPosition } from '@utils/events';
import { createAnimationLoop } from '@utils/rendering';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './DynamicBackground.module.scss';

const PIXEL_SIZE = window.innerWidth / 15;
const PIXEL_MAX_AGE = 1_000;

interface Pixel {
  created: number;
  x: number;
  y: number;
}

export const DynamicBackground: FunctionalComponent = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>();
  const screenSize = useScreenSize();
  const context = canvas?.getContext('2d');

  useEffect(() => {
    if (!canvas) return;
    Object.assign(canvas, resolveRealCanvasSize(canvas));
  }, [canvas, screenSize]);

  useEffect(() => {
    if (!context) return;

    const pixels = new Set<Pixel>();

    const stopLoop = createAnimationLoop(() => {
      if (!pixels.size) return;

      const now = performance.now();
      pixels.forEach((pixel) => {
        const age = (now - pixel.created) / PIXEL_MAX_AGE;

        if (age >= 1) {
          pixels.delete(pixel);
        } else {
          context.fillStyle = `hsl(0, 0%, ${(1 - age) * 10}%)`;
          context.fillRect(pixel.x, pixel.y, PIXEL_SIZE, PIXEL_SIZE);
        }
      });
    });

    const move = (evt: PointerEvent | TouchEvent) => {
      const { x: rx, y: ry } = getPosition(evt);
      const x = rx - (rx % PIXEL_SIZE);
      const y = ry - (ry % PIXEL_SIZE);
      pixels.add({ x, y, created: performance.now() });
    };

    window.addEventListener('touchmove', move);
    window.addEventListener('pointermove', move);
    return () => {
      window.removeEventListener('touchmove', move);
      window.removeEventListener('pointermove', move);
      stopLoop();
    };
  }, [context]);

  return (
    <div class={styles.dynamicBackground}>
      <canvas class={styles.canvas} ref={setCanvas} />
    </div>
  );
};
