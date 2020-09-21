import {clamp} from '@utils/math';
import {FunctionalComponent, h} from 'preact';
import {useEffect, useLayoutEffect, useRef, useState} from 'preact/hooks';
import {rx} from '../rx';
import styles from './PageSectionBackground.module.scss';

type Props = {
    index: number;
    title: string;
};

export const PageSectionBackground: FunctionalComponent<Props> = props => {
    const [visibility, setVisibility] = useState(0);
    const [bgHeaderFs, setBgHeaderFs] = useState(1);
    const element = useRef<HTMLDivElement>();

    useLayoutEffect(() => {
        const {width, height} = element.current?.getBoundingClientRect() || {};

        if (width && height) {
            setBgHeaderFs(Math.min(width, height) * 0.11);
        }
    }, []);

    useEffect(() => {
        const subscription = rx.scrollProgress
            .subscribe(([step, subStep]) => {
                setVisibility(clamp(step - (props.index + 1) + subStep, 0, 1));
            });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className={styles.pageSectionBackground}
             style={{
                 '--font-size': `${bgHeaderFs}px`,
                 '--offset': visibility
             }}
             ref={element}>
            <p>{props.title}</p>
        </div>
    );
};
