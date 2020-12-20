import {Link} from '@components/Link';
import {Section, sectionsContainer} from '@hooks/useSections';
import {clamp} from '@utils/math';
import {createRef, FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {fromEvent} from 'rxjs';
import {scp} from '../rx';
import styles from './Navigation.module.scss';

export const Navigation: FunctionalComponent = () => {
    const [pageSections, setPageSections] = useState<Section[]>([]);
    const [visibility, setVisibility] = useState(0);
    const [navOpen, setNavOpen] = useState(false);
    const navItems: Array<HTMLAnchorElement | null> = [];
    const bar = createRef<HTMLDivElement>();

    const updateBar = (offset = 0, partial = 0): void => {
        if (bar.current) {

            // Current element and next item
            const cel = navItems[offset];
            const nel = navItems[offset + 1];

            if (!cel || !nel) {
                return;
            }

            const barStyle = bar.current.style;
            const per = (cel.parentElement as HTMLElement).getBoundingClientRect();
            const cer = cel.getBoundingClientRect();

            // Bar width and offset
            if (nel) {
                const ner = nel.getBoundingClientRect();
                const barWidth = cer.width + (ner.width - cer.width) * partial;
                const barOffset = cer.left + (ner.left - cer.left) * partial;

                barStyle.width = `${barWidth}px`;
                barStyle.left = `${barOffset - per.left}px`;
            } else {
                barStyle.width = `${cer.width}px`;
                barStyle.left = `${cer.left - per.left}px`;
            }
        }
    };

    // Burger menu
    useEffect(() => {
        const closeBurger = navOpen ? fromEvent(window, 'click').subscribe(() => setNavOpen(false)) : null;
        return () => closeBurger?.unsubscribe();
    }, [navOpen]);

    // Nav-items bar
    useEffect(() => {
        const subscription = scp.subscribe(([offset, partial]) => {
            setVisibility(offset + partial);
            updateBar(offset, partial);
        });

        return () => subscription.unsubscribe();
    }, [bar.current, navItems]);

    useEffect(() => {
        const subscription = sectionsContainer.subscribe(setPageSections);
        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className={styles.navigation}
             style={{'--vis-in': clamp(visibility, 0, 1)}}
             role="navigation"
             aria-label="Main navigation">

            <div className={styles.wrapper}
                 data-open={navOpen}>
                <div className={styles.burger}
                     onClick={() => setNavOpen(!navOpen)}>
                    <div/>
                    <div/>
                    <div/>
                </div>

                <div className={styles.links}
                     style={{'--progress': visibility}}>
                    {pageSections.map(section => (
                        <Link href={`#${section.id}`}
                              key={section.id}
                              ref={instance => navItems.push(instance)}>
                            {section.title}
                        </Link>
                    ))}
                </div>

                <div className={styles.scrollBar} ref={bar}/>
            </div>

            <div className={styles.scrollHint}>
                {[...'START SCROLLING'].map((value, index, array) =>
                    <span key={index}
                          style={{animationDelay: `${index / array.length}s`}}>
                        {value}
                    </span>
                )}
            </div>
        </div>
    );
};
