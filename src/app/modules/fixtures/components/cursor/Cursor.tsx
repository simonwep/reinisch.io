import { c } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './Cursor.module.scss';

const CURSOR_SIZE = 16;

type CursorType = 'normal' | 'pointer';

interface PointerPosition {
  type: CursorType;
  x: number;
  y: number;
}

export const Cursor: FunctionalComponent = () => {
  const [pointerPosition, setPointerPosition] = useState<PointerPosition>();

  useEffect(() => {
    const update = ({ clientX, clientY, target }: PointerEvent) => {
      setPointerPosition({
        type: ((target as HTMLElement)?.getAttribute('data-cursor') ?? 'normal') as CursorType,
        x: clientX,
        y: clientY,
      });
    };

    window.addEventListener('pointermove', update);
    return () => window.removeEventListener('pointermove', update);
  }, []);

  const x = pointerPosition?.x ?? 0;
  const y = pointerPosition?.y ?? 0;

  return (
    <div
      class={c(styles.cursor, { [styles.pointer]: pointerPosition?.type == 'pointer' })}
      style={{ '--size': CURSOR_SIZE, '--x': x, '--y': y }}
    />
  );
};
