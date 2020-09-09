import {createRef, FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {clamp} from '../../utils/math';
import {rx} from '../rx';
import styles from './Navigation.module.scss';

const links = [
    ['Home', '#home'],
    ['Projects', '#projects']
];

export const Navigation: FunctionalComponent = () => {
    const [visibility, setVisibility] = useState(0);
    const navItems: Array<HTMLAnchorElement | null> = [];
    const bar = createRef();

    const updateBar = () => {
        const refRects = links
            .map(v => (document.querySelector(v[1]) as HTMLElement).getBoundingClientRect());

        /**
         * Calculate current scroll position based on element position.
         * And element counts as fully "visible" (or a 1) if the top position
         * is at the very top of the screen or above. Anything else is partially
         * visible and based on the top-distance to the next element
         */
        let index = -1;
        let lastTop = 0;
        for (const rect of refRects) {
            if (rect.top <= 0) {
                index++;
                lastTop = rect.top + window.scrollY;
            } else {
                index += (window.scrollY - lastTop) / (window.scrollY + rect.top - lastTop);
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
    };

    useEffect(() => {
        updateBar();
        const scollSubscription = rx.windowScroll.subscribe(updateBar);
        const scrollProgressSubscription = rx.scrollProgress.subscribe(([step, subStep]) => {
            setVisibility(step + subStep);
        });

        return () => {
            scrollProgressSubscription.unsubscribe();
            scollSubscription.unsubscribe();
        };
    });

    const scrollTo = (selector: string) => (evt: MouseEvent) => {
        document.querySelector(selector)?.scrollIntoView({behavior: 'smooth'});
        evt.preventDefault();
    };

    return (
        <div className={styles.navigation}
             style={{'--page-section-visibility': clamp(visibility, 0, 1)}}>
            <div className={styles.wrapper}>
                {links.map(([txt, query]) => (
                    <a href={`#${query}`}
                       onClick={scrollTo(query)}
                       key={query}
                       ref={instance => navItems.push(instance)}>{txt}</a>
                ))}
                <div ref={bar}/>
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
