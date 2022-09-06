import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { fromEvent, merge } from 'rxjs';
import styles from './Cursor.module.scss';

type State = {
    x: number;
    y: number;
    pressed: boolean;
    visible: boolean;
    focus: boolean;
};

const mouseEvents = merge(
    fromEvent<MouseEvent>(document, 'mouseup'),
    fromEvent<MouseEvent>(document, 'mousedown'),
    fromEvent<MouseEvent>(document, 'mousemove'),
    fromEvent<MouseEvent>(document, 'mouseleave')
);

export const Cursor: FunctionalComponent = () => {
    const [cursor, setCursor] = useState<State>({
        x: 0,
        y: 0,
        pressed: false,
        visible: false,
        focus: false,
    });

    useEffect(() => {
        const subscription = mouseEvents.subscribe((event: MouseEvent) => {
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
        });

        return () => subscription.unsubscribe();
    });

    return (
        <div
            className={styles.circle}
            data-pressed={cursor.pressed}
            data-visible={cursor.visible}
            data-focused={cursor.focus}
            style={{
                '--pos-x': cursor.x,
                '--pos-y': cursor.y,
            }}
        >
            <div />
            <div />
        </div>
    );
};
