import {Cursor} from '@components/Cursor';
import {LoadingScreen} from '@components/LoadingScreen';
import {PWAInstallPrompt} from '@components/PWAInstallPrompt';
import {useMedia} from '@hooks/useMedia';
import {sectionsContainer} from '@hooks/useSections';
import {calculateScrollProgress} from '@utils/scroll-progress';
import {h} from 'preact';
import {useEffect} from 'preact/hooks';
import {fromEvent} from 'rxjs';
import styles from './App.module.scss';
import {scp} from './rx';
import {ScrollIndicator} from './ScrollIndicator';
import {About} from './sections/About';
import {ActiveProjects} from './sections/ActiveProjects';
import {Archive} from './sections/Archive';
import {Footer} from './sections/Footer';
import {Header} from './sections/Header';
import {Navigation} from './sections/Navigation';
import {Presentations} from './sections/Presentations';

export default () => {
    const touchDevice = 'ontouchstart' in window;
    const media = useMedia();

    useEffect(() => {
        const subscription = fromEvent(window, 'scroll')
            .subscribe(() => {
                scp.next(
                    calculateScrollProgress(
                        sectionsContainer.value
                            .slice(1)
                            .map(v => v.id)
                    )
                );
            });
        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className={styles.app}>

            {/* Custom desktop-cursor */}
            {((media !== 'tablets' && media !== 'phones') || !touchDevice) && <Cursor/>}

            {/* Custom PWA Install prompt */}
            <PWAInstallPrompt/>

            {/* Loading screen for slow devices */}
            <LoadingScreen/>

            {/* Header and navigation */}
            <Header/>
            <Navigation/>

            {/* Actual content split up into sections */}
            <div className={styles.content}>
                {media !== 'phones' && <ScrollIndicator/>}
                <div className={styles.sections} role="main">
                    <ActiveProjects/>
                    <Archive/>
                    <Presentations/>
                    <About/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};
