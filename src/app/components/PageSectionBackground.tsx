import {FunctionalComponent, h} from 'preact';
import {useLayoutEffect, useRef, useState} from 'preact/hooks';
import styles from './PageSectionBackground.module.scss';

type Props = {
    title: string;
};

export const PageSectionBackground: FunctionalComponent<Props> = props => {
    const [bgHeaderFs, setBgHeaderFs] = useState(1);
    const element = useRef<HTMLDivElement>();

    useLayoutEffect(() => {
        const {width, height} = element.current?.getBoundingClientRect() || {};

        if (width && height) {
            setBgHeaderFs(Math.min(width, height) * 0.11);
        }
    }, []);

    return (
        <div className={styles.pageSectionBackground}
             style={{'--font-size': `${bgHeaderFs}px`}}
             ref={element}>
            <p>{props.title}</p>
        </div>
    );
};
