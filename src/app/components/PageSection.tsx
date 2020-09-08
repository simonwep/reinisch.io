import {FunctionalComponent, h} from 'preact';
import {useEffect, useRef, useState} from 'preact/hooks';
import styles from './PageSection.module.scss';

type Props = {
    intersectionRatioThreshold?: number;
    id?: string;
    title: string;
}

export const PageSection: FunctionalComponent<Props> = props => {
    const [visible, setVisible] = useState(false);
    const element = useRef<HTMLDivElement>();
    const threshold = props.intersectionRatioThreshold || 0.5;

    // Detect whenever the section becomes visible
    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(entries => {
            return setVisible(entries.some(entry => entry.intersectionRatio >= threshold));
        }, {threshold});

        intersectionObserver.observe(element.current);
        return () => intersectionObserver.disconnect();
    }, [element]);

    return (
        <div className={styles.pageSection}
             id={props.id}
             ref={element}
             style={`--page-section-visibility: ${visible ? 1 : 0}`}
             data-visible={visible}>

            <div className={styles.header}>
                <h1>{props.title}</h1>
                <h1>{props.title}</h1>
            </div>

            {props.children}
        </div>
    );
};
