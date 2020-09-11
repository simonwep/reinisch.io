import {h, RenderableProps} from 'preact';
import {forwardRef} from 'preact/compat';

type Props = {
    className?: string;
    id: string;
};

export const HashLink = forwardRef<HTMLAnchorElement, RenderableProps<Props>>((props, ref) => {
    const click = (e: MouseEvent) => {
        window.location.hash = props.id;
        document.getElementById(props.id)?.scrollIntoView({
            behavior: 'smooth'
        });

        e.preventDefault();
    };

    return (
        <a className={props.className}
           data-cursor-focus={true}
           ref={ref}
           href={`#${props.id}`}
           onClick={click}>
            {props.children}
        </a>
    );
});
