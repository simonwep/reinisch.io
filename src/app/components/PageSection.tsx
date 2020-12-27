import {Link} from '@components/Link';
import {sections} from '@store/sections';
import {clamp} from '@utils/math';
import {Fragment, FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import {scp} from '../rx';
import styles from './PageSection.module.scss';

type Props = {
    title: string;
    hideTitle?: boolean;
    hideNavigationItem?: boolean;
    intro?: string | JSXInternal.Element;
    id: string;
};

export const PageSection: FunctionalComponent<Props> = props => {
    const [visibility, setVisibility] = useState(0);

    useEffect(() => {
        sections.sync({
            id: props.id,
            title: props.title,
            hideNavigationItem: props.hideNavigationItem
        });

        const subscription = scp.subscribe(([step, subStep]) => {
            const index = sections.store.getState()
                .findIndex(v => v.id === props.id) - 1;

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

                <div className={styles.pageSectionBackground}>
                    <p>{props.title}</p>
                </div>
            </Fragment>}

            {props.intro && <h2 className={styles.intro}>{props.intro}</h2>}

            {props.children}
        </div>
    );
};
