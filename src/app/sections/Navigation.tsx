import {Link} from '@components/Link';
import {createRef, FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {clamp} from '@utils/math';
import {fromEvent} from 'rxjs';
import {rx} from '../rx';
import styles from './Navigation.module.scss';

const links = [
    ['Home', 'home'],
    ['Projects', 'projects'],
    ['Presentations', 'presentations'],
    ['About', 'about'],
    ['Links', 'links']
];

export const Navigation: FunctionalComponent = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [visibility, setVisibility] = useState(0);
    const navItems: Array<HTMLAnchorElement | null> = [];
    const bar = createRef<HTMLDivElement>();

    const updateBar = () => {
        const refRects = links
            .map(v => (document.getElementById(v[1]) as HTMLElement).getBoundingClientRect());

        /**
         * Calculate current scroll position based on element position.
         * And element counts as fully "visible" (or a 1) if the top position
         * is at the very top of the screen or above. Anything else is partially
         * visible and based on the top-distance to the next element.
         */
        let index = -1;
        let lastTop = 0;
        let lastBottom = 0;
        const {scrollTop, scrollHeight} = document.documentElement;
        for (const rect of refRects) {
            if (rect.top <= 0) {
                index++;
                lastTop = rect.top + scrollTop;
                lastBottom = window.innerHeight - (rect.bottom + -rect.top);
            } else {

                // Element will never be on top so use the bottom value as reference
                if ((rect.top + scrollTop) > (scrollHeight - window.innerHeight)) {

                    // Distance until the elements bottom touches the bottom of the page
                    index += 1 - (rect.bottom - window.innerHeight) / (rect.height - lastBottom);
                } else {

                    // Distance until the element touches the top of the page
                    index += (scrollTop - lastTop) / (scrollTop + rect.top - lastTop);
                }

                break;
            }
        }

        // Full page index and visibility index for the next one
        const pure = clamp(Math.floor(index), 0, navItems.length - 1);
        const subStep = Math.max(index % 1, 0);

        if (bar.current) {

            // Current element and next item
            const cel = navItems[pure] as HTMLElement;
            const nel = navItems[pure + 1];

            const barStyle = bar.current.style;
            const per = (cel.parentElement as HTMLElement).getBoundingClientRect();
            const cer = cel.getBoundingClientRect();

            // Bar width and offset
            if (nel) {
                const ner = nel.getBoundingClientRect();
                const barWidth = cer.width + (ner.width - cer.width) * subStep;
                const barOffset = cer.left + (ner.left - cer.left) * subStep;

                barStyle.width = `${barWidth}px`;
                barStyle.left = `${barOffset - per.left}px`;
            } else {
                barStyle.width = `${cer.width}px`;
                barStyle.left = `${cer.left - per.left}px`;
            }
        }

        rx.scrollProgress.next([pure, subStep]);
        setVisibility(pure + subStep);
    };

    useEffect(() => {
        const closeBurger = navOpen ? fromEvent(window, 'click').subscribe(() => setNavOpen(false)) : null;
        return () => closeBurger?.unsubscribe();
    }, [navOpen]);

    useEffect(() => {
        updateBar();
        const scollSubscription = rx.windowScroll.subscribe(updateBar);
        return () => scollSubscription.unsubscribe();
    }, [updateBar]);

    return (
        <div className={styles.navigation}
             style={{'--page-section-visibility': clamp(visibility, 0, 1)}}>

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
                    {links.map(([txt, id]) => (
                        <Link href={`#${id}`}
                              key={id}
                              ref={instance => navItems.push(instance)}>
                            {txt}
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
