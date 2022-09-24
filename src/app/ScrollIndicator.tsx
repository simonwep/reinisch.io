import { useStore } from '@hooks/useStore';
import { clamp } from '@utils/math';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './ScrollIndicator.module.scss';

export const ScrollIndicator: FunctionalComponent = () => {
    const [progress, setProgress] = useState(0);
    const store = useStore();

    useEffect(() => {
        const [offset, partial] = store.scrollOffset;
        setProgress(clamp(offset + partial, 0, 2));
    }, [store.scrollOffset]);

    return (
        <div
            className={styles.scrollIndicator}
            style={{
                '--progress': progress,
                '--fadeout': Math.max(0, (progress - 0.5) / 0.5),
            }}
        >
            <div />
        </div>
    );
};
