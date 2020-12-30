import {cn} from '@utils/preact-utils';
import {h, RenderableProps} from 'preact';
import {forwardRef} from 'preact/compat';
import styles from './Link.module.scss';

type Props = {
    className?: string;
    style?: string | Record<string, string | number>;
    label?: string;
    href: string;
};

export const Link = forwardRef<HTMLAnchorElement, RenderableProps<Props>>((props, ref) => {
    const handleHashLink = (e: MouseEvent) => {
        history.pushState(null, document.title, props.href);
        document.getElementById(props.href.slice(1))?.scrollIntoView({
            behavior: 'smooth'
        });

        e.preventDefault();
    };

    return (
        <a className={cn(props.className, styles.link)}
           data-cursor-focus={true}
           style={props.style}
           rel="noopener noreferrer"
           target="_blank"
           ref={ref}
           href={props.href}
           aria-label={props.label}
           onClick={props.href.startsWith('#') ? handleHashLink : undefined}>
            {props.label && <p className={styles.visibleHidden}>{props.label}</p>}
            {props.children}
        </a>
    );
});
