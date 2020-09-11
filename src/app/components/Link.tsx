import {h, RenderableProps} from 'preact';
import {forwardRef} from 'preact/compat';

type Props = {
    className?: string;
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
        <a className={props.className}
           data-cursor-focus={true}
           rel="noopener noreferrer"
           target="_blank"
           ref={ref}
           href={props.href}
           onClick={props.href.startsWith('#') ? handleHashLink : undefined}>
            {props.children}
        </a>
    );
});
