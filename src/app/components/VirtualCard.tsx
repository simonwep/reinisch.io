import {clamp} from '@utils/math';
import {cn} from '@utils/preact-utils';
import {FunctionalComponent, h} from 'preact';
import {useEffect, useRef, useState} from 'preact/hooks';
import styles from './VirtualCard.module.scss';

type Props = {
    className?: string;
    intensity?: number;
    link?: string;
};

export const VirtualCard: FunctionalComponent<Props> = props => {
    const [rotation, setRotation] = useState<[number, number]>([0, 0]);
    const [transition, setTransition] = useState<boolean>(false);
    const element = useRef<HTMLDivElement>();

    const open = () => window.open(props.link, '__blank', 'noopener,noreferrer');
    const mouseLeave = () => setRotation([0, 0]);
    const mouseEnter = () => setTransition(true);
    const mouseMove = (evt: MouseEvent) => {
        const tr = (element.current).getBoundingClientRect();
        const px = clamp((evt.clientX - tr.left) / tr.width - 0.5, -0.5, 0.5);
        const py = clamp(0.5 - (evt.clientY - tr.top) / tr.height, -0.5, 0.5);
        setRotation([px, py]);
    };

    useEffect(() => {
        if (transition) {
            const timeout = setTimeout(() => setTransition(false), 150);
            return () => clearTimeout(timeout);
        }
    }, [transition]);

    return (
        <div className={cn(styles.virtualCard, props.className)}
             data-cursor-focus={!!props.link}
             ref={element}
             onClick={props.link ? open : undefined}
             onMouseEnter={mouseEnter}
             onMouseLeave={mouseLeave}
             onMouseMove={mouseMove}
             style={{
                 '--base-transition': transition ? 'none' : 'all 0.5s',
                 '--hover-transition': transition ? 'all 100ms' : 'none',
                 '--rotation-x': rotation[0] * (props.intensity || 1),
                 '--rotation-y': rotation[1] * (props.intensity || 1)
             }}>
            {props.children}
        </div>
    );
};
