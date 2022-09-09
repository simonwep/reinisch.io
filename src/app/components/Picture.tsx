import { FunctionalComponent } from 'preact';

interface Props {
    className?: string;
    images: string[];
    alt?: string;
}

export const Picture: FunctionalComponent<Props> = (props) => (
    <picture className={props.className}>
        {props.images.map((url, index) => (
            <source srcSet={url} type={`image/${url.replace(/.*\./, '')}`} key={index} />
        ))}
        <img loading="lazy" style="all: inherit;" src={props.images[props.images.length - 1]} alt={props.alt} />
    </picture>
);
