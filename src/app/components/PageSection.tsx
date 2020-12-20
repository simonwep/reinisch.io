import {Link} from '@components/Link';
import {PageSectionBackground} from '@components/PageSectionBackground';
import {sections, sectionsContainer} from '@hooks/useSections';
import {clamp} from '@utils/math';
import {Fragment, FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import {scp} from '../rx';
import styles from './PageSection.module.scss';

type Props = {
    title: string;
    hideTitle?: boolean;
    intro?: string | JSXInternal.Element;
    id: string;
};

export const PageSection: FunctionalComponent<Props> = props => {
    const [visibility, setVisibility] = useState(0);

    useEffect(() => {
        sections.next({
            id: props.id,
            title: props.title
        });

        const subscription = scp.subscribe(([step, subStep]) => {
            const index = sectionsContainer.value.findIndex(v => v.id === props.id) - 1;
            setVisibility(clamp(step - index + subStep, 0, 2));
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className={styles.pageSection}
             aria-label={props.title}
             id={props.id}
             style={{
                 '--vis': visibility,
                 '--vis-in': clamp(visibility, 0, 1),
                 '--vis-out': (clamp(visibility, 1, 2) - 1)
             }}>
            <div className={styles.divider} data-cursor-focus={true}>
                <div className={styles.cube}>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>

            {!props.hideTitle && <Fragment>
                <Link className={styles.header}
                      href={`#${props.id}`}>
                    <p>#</p>
                    <h1>{props.title}</h1>
                    <h1>{props.title}</h1>
                </Link>

                <PageSectionBackground title={props.title}/>
            </Fragment>}

            {props.intro && <h2 className={styles.intro}>{props.intro}</h2>}

            {props.children}
        </div>
    );
};
