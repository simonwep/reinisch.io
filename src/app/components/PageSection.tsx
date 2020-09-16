import {Link} from '@components/Link';
import {clamp} from '@utils/math';
import {Fragment, FunctionalComponent, h} from 'preact';
import {useEffect, useLayoutEffect, useRef, useState} from 'preact/hooks';
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
    const [bgHeaderFs, setBgHeaderFs] = useState(1);
    const element = useRef<HTMLDivElement>();

    useLayoutEffect(() => {
        const height = element.current?.getBoundingClientRect().height;

        if (height) {
            setBgHeaderFs(height / 10);
        }

    }, []);

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

            {props.title && <Fragment>
                <Link className={styles.header}
                      href={`#${props.id}`}>
                    <p>#</p>
                    <h1>{props.title}</h1>
                    <h1>{props.title}</h1>
                </Link>

                <div className={styles.backgroundHeader}
                     style={{'--font-size': `${bgHeaderFs}px`}}>
                    <p>{props.title}</p>
                </div>
            </Fragment>}

            {props.intro && <h2 className={styles.intro}>{props.intro}</h2>}

            {props.children}
        </div>
    );
};
