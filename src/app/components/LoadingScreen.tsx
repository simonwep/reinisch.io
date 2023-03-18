import { cn } from '@utils/preact-utils';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './LoadingScreen.module.scss';

interface Props {
    loaded: boolean;
}

export const LoadingScreen: FunctionalComponent<Props> = (props) => {
    if (import.meta.env.DEV) {
        return <></>;
    }

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setProgress(0.85));

        if (props.loaded) {
            cancelAnimationFrame(frame);
            setProgress(1);
        }
    }, [props.loaded]);

    return (
        <div
            className={cn(styles.loadingScreen, {
                [styles.loaded]: progress === 1,
            })}
            style={{ '--progress': progress }}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
        >
            <span class={styles.text}>Loading...</span>
            <div className={styles.loadingBar} />
        </div>
    );
};
