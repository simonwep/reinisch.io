import {Link} from '@components/Link';
import {PageSectionBackground} from '@components/PageSectionBackground';
import {clamp} from '@utils/math';
import {createRef, Fragment, FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import {fromEvent} from 'rxjs';
import {scp} from '../rx';
import {navigationlinks} from '../sections/Navigation';
import styles from './PageSection.module.scss';

type Props = {
    title?: string;
    intro?: string | JSXInternal.Element;
    id: string;
};

export const PageSection: FunctionalComponent<Props> = props => {
    const [visibility, setVisibility] = useState<number>(0);
    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        const subscription = fromEvent(window, 'scroll').subscribe(() => {
            const doc = document.documentElement;
            const rect = ref.current?.getBoundingClientRect();

            if (rect) {
                const base = rect.top + doc.scrollTop;

                // Some elements might not start at the very top, take that into account
                let raw = base > 0 && base < window.innerHeight ?
                    (base - rect.top) / (window.innerHeight - base) :
                    1 - (rect.top / window.innerHeight);

                // Check if element will never be on top (for example a footer)
                if ((base + window.innerHeight) > doc.scrollHeight) {
                    raw = 1 - (doc.scrollHeight - window.innerHeight - doc.scrollTop) / rect.height;
                }

                const vis = clamp(raw, 0, 2);
                setVisibility(vis);

                if (vis <= 1 && vis > 0) {
                    let index = 0;

                    for (; index < navigationlinks.length; index++) {
                        if (navigationlinks[index][1] === props.id) {
                            index--;
                            break;
                        }
                    }

                    scp.next([index, vis]);
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [ref]);

    return (
        <div className={styles.pageSection}
             id={props.id}
             ref={ref}
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

            {props.title && <Fragment>
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
