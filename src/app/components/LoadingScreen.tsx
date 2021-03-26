import {Fragment, FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {pageLoaded} from '../rx';
import styles from './LoadingScreen.module.scss';

export const LoadingScreen: FunctionalComponent = () => {
    if (env.NODE_ENV === 'development') {
        return <Fragment/>;
    }

    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const frame = requestAnimationFrame(() => setProgress(0.85));

        const subscription = pageLoaded.subscribe(loaded => {
            cancelAnimationFrame(frame);
            loaded && setProgress(1);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className={styles.loadingScreen}
             data-loaded={progress === 1}
             style={{'--progress': progress}}
             aria-valuemin="0"
             aria-valuemax="100"
             role="progressbar">

            <span>Loading...</span>
            <div className={styles.loadingBar}/>
        </div>
    );
};
