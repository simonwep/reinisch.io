import {Link} from '@components/Link';
import {PageSectionBackground} from '@components/PageSectionBackground';
import {clamp} from '@utils/math';
import {Fragment, FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import {rx} from '../rx';
import styles from './PageSection.module.scss';

type Props = {
    index: number;
    title?: string;
    intro?: string | JSXInternal.Element;
    id: string;
}

export const PageSection: FunctionalComponent<Props> = props => {
    const [visibility, setVisibility] = useState(0);

    useEffect(() => {
        const subscription = rx.scrollProgress
            .subscribe(([step, subStep]) => {
                setVisibility(clamp(step - props.index + subStep, 0, 1));
            });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className={styles.pageSection} id={props.id} style={`--psv: ${visibility}`}>
            {props.index > 0 ? <div className={styles.divider} data-cursor-focus={true}>
                <div className={styles.cube}>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div> : ''}

            {props.title && <Fragment>
                <Link className={styles.header}
                      href={`#${props.id}`}>
                    <p>#</p>
                    <h1>{props.title}</h1>
                    <h1>{props.title}</h1>
                </Link>

                <PageSectionBackground index={props.index} title={props.title}/>
            </Fragment>}

            {props.intro && <h2 className={styles.intro}>{props.intro}</h2>}

            {props.children}
        </div>
    );
};
