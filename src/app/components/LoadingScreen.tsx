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
            className={styles.loadingScreen}
            data-loaded={progress === 1}
            style={{ '--progress': progress }}
            aria-valuemin="0"
            aria-valuemax="100"
            role="progressbar"
        >
            <span>Loading...</span>
            <div className={styles.loadingBar} />
        </div>
    );
};
