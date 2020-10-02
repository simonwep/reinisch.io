import {Link} from '@components/Link';
import {createRef, FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {clamp} from '@utils/math';
import {fromEvent} from 'rxjs';
import {scp} from '../rx';
import styles from './Navigation.module.scss';

const navigationlinks = [
    ['Home', 'home'],
    ['Projects', 'projects'],
    ['Presentations', 'presentations'],
    ['About', 'about'],
    ['Links', 'links']
];

// I don't know how most of this works anymore.
const updateScrollProgress = () => {
    const {scrollHeight, scrollTop} = document.scrollingElement || document.documentElement;
    const {innerHeight} = window;
    let index = 0;

    for (const [, id] of navigationlinks.slice(1)) {
        const rect = (document.getElementById(id) as HTMLElement).getBoundingClientRect();

        if (rect.top <= 0) {
            index++;
            continue;
        }

        const base = scrollTop + rect.top;
        let raw = 1 - (rect.top / innerHeight);

        // Some elements might not start at the very top, take that into account
        if (base > 0 && base < innerHeight) {
            raw = (base - rect.top) / (innerHeight - base);
        }

        // Check if element will never be on top (for example a footer)
        if ((base + innerHeight) > scrollHeight) {
            raw = 1 - (scrollHeight - innerHeight - scrollTop) / rect.height;
        }

        if (raw >= 1) {
            index++;
            continue;
        }

        if (raw >= 0) {
            index += Math.min(raw, 1);
            break;
        }
    }

    scp.next([Math.floor(index), index % 1]);
};

export const Navigation: FunctionalComponent = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [visibility, setVisibility] = useState(0);
    const navItems: Array<HTMLAnchorElement | null> = [];
    const bar = createRef<HTMLDivElement>();

    useEffect(() => {
        const closeBurger = navOpen ? fromEvent(window, 'click').subscribe(() => setNavOpen(false)) : null;
        return () => closeBurger?.unsubscribe();
    }, [navOpen]);

    useEffect(() => {
        const scrollSubscription = fromEvent(window, 'scroll').subscribe(updateScrollProgress);
        const scpSubscription = scp.subscribe(([full, sub]) => {
            if (bar.current) {

                // Current element and next item
                const cel = navItems[full] as HTMLElement;
                const nel = navItems[full + 1];

                const barStyle = bar.current.style;
                const per = (cel.parentElement as HTMLElement).getBoundingClientRect();
                const cer = cel.getBoundingClientRect();

                // Bar width and offset
                if (nel) {
                    const ner = nel.getBoundingClientRect();
                    const barWidth = cer.width + (ner.width - cer.width) * sub;
                    const barOffset = cer.left + (ner.left - cer.left) * sub;

                    barStyle.width = `${barWidth}px`;
                    barStyle.left = `${barOffset - per.left}px`;
                } else {
                    barStyle.width = `${cer.width}px`;
                    barStyle.left = `${cer.left - per.left}px`;
                }
            }

            setVisibility(full + sub);
        });

        return () => {
            scrollSubscription.unsubscribe();
            scpSubscription.unsubscribe();
        };
    }, [bar]);

    // Initialize
    useEffect(updateScrollProgress, []);

    return (
        <div className={styles.navigation}
             style={{'--vis-in': clamp(visibility, 0, 1)}}>

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
                    {navigationlinks.map(([txt, id]) => (
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
