import {FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {fromEvent} from 'rxjs';
import styles from './CircleCursor.module.scss';

type Cursor = {
    x: number;
    y: number;
    visible: boolean;
    focus: boolean;
}

export const CircleCursor: FunctionalComponent = () => {
    const [cursor, setCursor] = useState<Cursor>({
        x: 0,
        y: 0,
        visible: false,
        focus: false
    });

    useEffect(() => {
        const move = fromEvent<MouseEvent>(document, 'mousemove')
            .subscribe(event => {
                const elements = event.composedPath();

                setCursor({
                    x: event.clientX,
                    y: event.clientY,
                    visible: true,
                    focus: elements.some(el => {
                        return el instanceof HTMLElement ? el.getAttribute('data-cursor-focus') : false;
                    })
                });
            });

        const enter = fromEvent<MouseEvent>(document, 'mousenter')
            .subscribe(() => setCursor({...cursor, visible: true}));

        const leave = fromEvent<MouseEvent>(document, 'mouseleave')
            .subscribe(() => setCursor({...cursor, visible: false}));

        return () => {
            move.unsubscribe();
            enter.unsubscribe();
            leave.unsubscribe();
        };
    });

    return (
        <div className={styles.circle}
             data-visible={cursor.visible}
             data-focused={cursor.focus}
             style={{
                 '--pos-x': cursor.x,
                 '--pos-y': cursor.y
             }}/>
    );
};
