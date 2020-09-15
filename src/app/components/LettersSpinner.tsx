import {FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {cn} from '@utils/preact-utils';
import styles from './LettersSpinner.module.scss';

type Props = {
    words: Array<string>;
    className?: string;
    interval?: number;
    speed?: number;
};

export const LettersSpinner: FunctionalComponent<Props> = props => {
    const [currentWord, setCurrentWord] = useState(0);
    const invisiblePlaceholder = props.words.reduce((pv, cv) => cv.length > pv.length ? cv : pv, '');
    const {interval = 1500, speed = 300} = props;

    useEffect(() => {
        const timeout = setTimeout(() => {
            const next = currentWord + 1;
            setCurrentWord(next >= props.words.length ? 0 : next);
        }, interval);

        return () => clearTimeout(timeout);
    }, [currentWord]);

    return (
        <div className={cn(styles.lettersSpinner, props.className)}>
            <span className={styles.placeholder}>{invisiblePlaceholder}</span>

            <div className={styles.words}>
                {props.words.map((value, index) => (
                    <p key={index}
                       className={styles.word}
                       data-hidden={Math.abs(index - currentWord) > 1}
                       data-fadein={index === currentWord}
                       data-fadeout={index !== currentWord}>
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
