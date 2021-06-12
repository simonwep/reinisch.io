import {Link} from '@components/Link';
import {RunningBanner} from '@components/RunningBanner';
import {sections} from '@store/sections';
import {track} from '@utils/ackee';
import {clamp} from '@utils/math';
import {useStore} from 'effector-react';
import {createRef, FunctionalComponent} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {fromEvent} from 'rxjs';
import {scp} from '../rx';
import styles from './Navigation.module.scss';

export const Navigation: FunctionalComponent = () => {
    const [visibility, setVisibility] = useState(0);
    const [navOpen, setNavOpen] = useState(false);
    const pageSections = useStore(sections.store);
    const navItems: Array<HTMLAnchorElement | null> = [];
    const bar = createRef<HTMLDivElement>();

    const updateBar = (offset = 0, partial = 0): void => {
        if (bar.current) {

            // Current element and next item
            const cel = navItems[offset];
            const nel = navItems[offset + 1];

            if (!cel) {
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

    const onNavigation = (): void => {
        track.general.navigated();
    };

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
                    {pageSections
                        .filter(v => !v.hideNavigationItem)
                        .map((section, index) => (
                            <Link href={`#${section.id}`}
                                  onClick={onNavigation}
                                  key={section.id}
                                  ref={instance => navItems.push(instance)}
                                  style={{'--clip': `inset(0 0 calc((${index + 1} - var(--progress)) * 100%) 0)`}}>
                                {section.title}
                            </Link>
                        ))}
                </div>

                <div className={styles.scrollBar} ref={bar}/>
            </div>

            <RunningBanner text="START SCROLLING" className={styles.banner}/>
        </div>
    );
};
