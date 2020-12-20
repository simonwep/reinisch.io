import {cn} from '@utils/preact-utils';
import {FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import styles from './SpinningHeadline.module.scss';

type Props = {
    words: Array<string>;
    className?: string;
    interval?: number;
    speed?: number;
};

export const SpinningHeadline: FunctionalComponent<Props> = props => {
    const [currentWord, setCurrentWord] = useState(0);
    const invisiblePlaceholder = props.words.reduce((pv, cv) => cv.length > pv.length ? cv : pv, '');
    const {interval = 1800, speed = 400} = props;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentWord((currentWord + 1) % props.words.length);
        }, interval);

        return () => clearTimeout(timeout);
    }, [currentWord]);

    const fadeOutIndex = (currentWord ? currentWord : props.words.length) - 1;
    return (
        <div className={cn(styles.spinningHeadline, props.className)}>
            <span className={styles.placeholder}>{invisiblePlaceholder}</span>

            <div className={styles.words}>
                {props.words.map((value, index) => (
                    <p key={index}
                       className={styles.word}
                       data-fadein={index === currentWord}
                       data-fadeout={index === fadeOutIndex}>
                        {[...value].map((c, i) =>
                            <span key={i}
                                  style={{
                                      animationDelay: index === currentWord ? `${(i / value.length) * speed}ms` : 'unset'
                                  }}>{c}</span>
                        )}
                    </p>
                ))}
            </div>
        </div>
    );
};
