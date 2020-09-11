import {CircleCursor} from '@components/CircleCursor';
import {clamp} from '@utils/math';
import {useEffect, useState} from 'preact/hooks';
import styles from './App.module.scss';
import {h} from 'preact';
import {rx} from './rx';
import {Archive} from './sections/Archive';
import {Header} from './sections/Header';
import {Navigation} from './sections/Navigation';
import {Projects} from './sections/Projects';

export default () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const subscription = rx.scrollProgress
            .subscribe(([, subStep]) => {
                setProgress(clamp(subStep, 0, 2));
            });

        return () => subscription.unsubscribe();
    });

    return (
        <div className={styles.app}>
            <CircleCursor/>

            {/* Header and navigation */}
            <Header/>
            <Navigation/>

            {/* Actual content split up into sections */}
            <div className={styles.sections}>
                <div className={styles.pageIndex}
                     style={{'--progress': progress}}>
                    <div/>
                </div>
                <div className={styles.left}>
                    <Projects/>
                    <Archive/>
                </div>
            </div>
        </div>
    );
};
