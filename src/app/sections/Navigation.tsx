import {Link} from '@components/Link';
import {createRef, FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {clamp} from '@utils/math';
import {fromEvent} from 'rxjs';
import {scp} from '../rx';
import styles from './Navigation.module.scss';

export const navigationlinks = [
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

    const updateBar = ([full, sub]: [number, number]) => {
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
    };

    useEffect(() => {
        const closeBurger = navOpen ? fromEvent(window, 'click').subscribe(() => setNavOpen(false)) : null;
        return () => closeBurger?.unsubscribe();
    }, [navOpen]);

    useEffect(() => {
        const scollSubscription = scp.subscribe(updateBar);
        return () => scollSubscription.unsubscribe();
    }, [bar]);

    useEffect(() => updateBar([0, 0]), []);

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
