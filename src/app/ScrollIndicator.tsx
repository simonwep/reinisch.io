import {clamp} from '@utils/math';
import {useEffect, useState} from 'preact/hooks';
import {FunctionalComponent, h} from 'preact';
import {scp} from './rx';
import styles from './ScrollIndicator.module.scss';

export const ScrollIndicator: FunctionalComponent = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const subscription = scp.subscribe(([full, sub]) => {
            setProgress(clamp(full + sub, 0, 2));
        });

        return () => subscription.unsubscribe();
    });

    return (
        <div className={styles.scrollIndicator}
             style={{
                 '--progress': progress,
                 '--fadeout': Math.max(0, (progress - 0.5) / 0.5)
             }}>
            <div/>
        </div>
    );
};
