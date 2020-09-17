import {clamp} from '@utils/math';
import {useEffect, useState} from 'preact/hooks';
import {FunctionalComponent, h} from 'preact';
import {rx} from './rx';
import styles from './ScrollIndicator.module.scss';

export const ScrollIndicator: FunctionalComponent = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const subscription = rx.scrollProgress
            .subscribe(([, subStep]) => {
                setProgress(clamp(subStep, 0, 2));
            });

        return () => subscription.unsubscribe();
    });

    return (
        <div className={styles.pageIndex} style={{'--progress': progress}}>
            <div/>
        </div>
    );
};
