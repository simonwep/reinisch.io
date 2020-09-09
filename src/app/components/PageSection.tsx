import {clamp} from '@utils/math';
import {FunctionalComponent, h} from 'preact';
import {useEffect, useRef, useState} from 'preact/hooks';
import {rx} from '../rx';
import styles from './PageSection.module.scss';

type Props = {
    index: number;
    title: string;
    intro: string;
    id?: string;
}

export const PageSection: FunctionalComponent<Props> = props => {
    const [visibility, setVisibility] = useState(0);
    const element = useRef<HTMLDivElement>();

    useEffect(() => {
        const subscription = rx.scrollProgress
            .subscribe(([step, subStep]) => {
                setVisibility(clamp(step - props.index + subStep, 0, 1));
            });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className={styles.pageSection}
             id={props.id}
             ref={element}
             style={`--page-section-visibility: ${visibility}`}>

            <div className={styles.header}>
                <a href={`#${props.id}`}>#</a>
                <h1>{props.title}</h1>
                <h1>{props.title}</h1>
            </div>

            <h1 className={styles.backgroundHeader}>
                <p>{props.title}</p>
            </h1>

            <h3 className={styles.intro}>{props.intro}</h3>

            {props.children}
        </div>
    );
};
