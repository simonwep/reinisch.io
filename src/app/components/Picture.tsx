import { cn } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import styles from './Picture.module.scss';

interface Props {
    className?: string;
    images: string[];
    alt?: string;
}

export const Picture: FunctionalComponent<Props> = (props) => (
    <picture className={cn(props.className, styles.picture)}>
        {props.images.map((url, index) => (
            <source srcSet={url} type={`image/${url.replace(/.*\./, '')}`} key={index} />
        ))}
        <img loading="lazy" className={styles.fallback} src={props.images[props.images.length - 1]} alt={props.alt} />
    </picture>
);
