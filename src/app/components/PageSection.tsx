import {FunctionalComponent, h} from 'preact';
import {useEffect, useRef, useState} from 'preact/hooks';
import {rx} from '../rx';
import styles from './PageSection.module.scss';

type Props = {
    id?: string;
    title: string;
}

export const PageSection: FunctionalComponent<Props> = props => {
    const [visibility, setVisibility] = useState(0);
    const element = useRef<HTMLDivElement>();

    useEffect(() => {
        const subscription = rx.scrollProgress
            .subscribe(([step, subStep]) => {
                setVisibility(step + subStep);
            });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className={styles.pageSection}
             id={props.id}
             ref={element}
             style={`--page-section-visibility: ${visibility}`}
             data-visible={visibility === 1}>

            <div className={styles.header}>
                <h1>{props.title}</h1>
                <h1>{props.title}</h1>
            </div>

            {props.children}
        </div>
    );
};
