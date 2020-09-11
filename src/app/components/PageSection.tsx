import {HashLink} from '@components/HashLink';
import {clamp} from '@utils/math';
import {FunctionalComponent, h} from 'preact';
import {useEffect, useRef, useState} from 'preact/hooks';
import {rx} from '../rx';
import styles from './PageSection.module.scss';

type Props = {
    index: number;
    title?: string;
    intro?: string;
    id: string;
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

            {props.index > 0 ? <div className={styles.divider}>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div> : ''}

            <HashLink className={styles.header}
                      id={props.id}>
                <p>#</p>
                <h1>{props.title}</h1>
                <h1>{props.title}</h1>
            </HashLink>

            {props.title && <h1 className={styles.backgroundHeader}><p>{props.title}</p></h1>}
            {props.intro && <h3 className={styles.intro}>{props.intro}</h3>}

            {props.children}
        </div>
    );
};
