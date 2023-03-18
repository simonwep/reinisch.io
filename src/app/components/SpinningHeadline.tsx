import { media } from '@utils/media';
import { cn } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import styles from './SpinningHeadline.module.scss';

export interface Slogan {
    text: string;
    icon?: JSXInternal.Element;
}

interface Props {
    slogans: Array<Slogan>;
    className?: string;
    interval?: number;
    speed?: number;
}

export const SpinningHeadline: FunctionalComponent<Props> = (props) => {
    const [currentWord, setCurrentWord] = useState(0);
    const { interval = 1800, speed = 400 } = props;

    const maxLength = props.slogans.reduce((pv, cv) => {
        const length = cv.text.length + (cv.icon ? 1 : 0);
        return Math.max(length, pv);
    }, 0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentWord((currentWord + 1) % props.slogans.length);
        }, interval);

        return () => clearTimeout(timeout);
    }, [currentWord]);

    const fadeOutIndex = (currentWord ? currentWord : props.slogans.length) - 1;
    return (
        <div className={cn(styles.spinningHeadline, props.className)}>
            <span className={styles.placeholder} style={{ width: `${maxLength}ch` }} />

            <div>
                {props.slogans.map(({ text, icon }, index) => (
                    <p
                        key={index}
                        className={cn(styles.word, {
                            [styles.fadeIn]: index === currentWord,
                            [styles.fadeOut]: index === fadeOutIndex,
                        })}
                    >
                        {media.reducedMotion ? (
                            <span class={styles.letter}>
                                {text} {icon}
                            </span>
                        ) : (
                            <>
                                {[...text].map((c, i) => (
                                    <span
                                        class={styles.letter}
                                        key={i}
                                        style={{
                                            animationDelay:
                                                index === currentWord ? `${(i / text.length) * speed}ms` : 'unset',
                                        }}
                                    >
                                        {c}
                                    </span>
                                ))}

                                {icon && (
                                    <span
                                        class={styles.letter}
                                        style={{
                                            animationDelay: index === currentWord ? `${speed}ms` : 'unset',
                                        }}
                                    >
                                        {icon}
                                    </span>
                                )}
                            </>
                        )}
                    </p>
                ))}
            </div>
        </div>
    );
};
