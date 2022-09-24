import { Link } from '@components/Link';
import { useStore } from '@hooks/useStore';
import { clamp } from '@utils/math';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import styles from './PageSection.module.scss';

interface Props {
    title: string;
    hideTitle?: boolean;
    hideNavigationItem?: boolean;
    intro?: string | JSXInternal.Element;
    id: string;
}

export const PageSection: FunctionalComponent<Props> = (props) => {
    const [visibility, setVisibility] = useState(0);
    const store = useStore();

    useEffect(() => {
        store.addSection({
            id: props.id,
            title: props.title,
            hideNavigationItem: props.hideNavigationItem,
        });
    }, []);

    useEffect(() => {
        const index = store.sections.findIndex((section) => section.id === props.id) - 1;
        const [offset, partial] = store.scrollOffset;
        setVisibility(clamp(offset - index + partial, 0, 2));
    }, [store.scrollOffset]);

    return (
        <div
            className={styles.pageSection}
            aria-label={props.title}
            id={props.id}
            style={{
                '--vis-in': clamp(visibility, 0, 1),
                '--vis-out': clamp(visibility, 1, 2) - 1,
            }}
        >
            <div className={styles.divider} data-cursor-focus={true}>
                <div className={styles.cube}>
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>

            {!props.hideTitle && (
                <>
                    <Link className={styles.header} href={`#${props.id}`}>
                        <p>#</p>
                        <h1>{props.title}</h1>
                        <h1>{props.title}</h1>
                    </Link>

                    <div className={styles.pageSectionBackground}>
                        <p>{props.title}</p>
                    </div>
                </>
            )}

            {props.intro && <h2 className={styles.intro}>{props.intro}</h2>}

            {props.children}
        </div>
    );
};
