import { cn } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './Cursor.module.scss';

type State = {
    x: number;
    y: number;
    pressed: boolean;
    visible: boolean;
    focus: boolean;
};

export const Cursor: FunctionalComponent = () => {
    const [cursor, setCursor] = useState<State>({
        x: 0,
        y: 0,
        pressed: false,
        visible: false,
        focus: false,
    });

    const handleMouseEvent = (event: MouseEvent) => {
        switch (event.type) {
            case 'mouseup': {
                setCursor({ ...cursor, pressed: false });
                break;
            }
            case 'mousedown': {
                setCursor({ ...cursor, pressed: true });
                break;
            }
            case 'mousemove': {
                setCursor({
                    x: event.clientX,
                    y: event.clientY,
                    visible: true,
                    pressed: cursor.pressed,
                    focus: event
                        .composedPath()
                        .some((el) => el instanceof HTMLElement && el.getAttribute('data-cursor-focus')),
                });
                break;
            }
            case 'mouseleave': {
                setCursor({ ...cursor, visible: false });
                break;
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseEvent);
        document.addEventListener('mousedown', handleMouseEvent);
        document.addEventListener('mousemove', handleMouseEvent);
        document.addEventListener('mouseleave', handleMouseEvent);
        return () => {
            document.removeEventListener('mouseup', handleMouseEvent);
            document.removeEventListener('mousedown', handleMouseEvent);
            document.removeEventListener('mousemove', handleMouseEvent);
            document.removeEventListener('mouseleave', handleMouseEvent);
        };
    });

    return (
        <div
            className={cn(styles.circle, {
                [styles.pressed]: cursor.pressed,
                [styles.visible]: cursor.visible,
                [styles.focused]: cursor.focus,
            })}
            style={{
                '--pos-x': cursor.x,
                '--pos-y': cursor.y,
            }}
        >
            <div class={styles.inner} />
            <div class={styles.outer} />
        </div>
    );
};
