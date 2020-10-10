import {Cursor} from '@components/Cursor';
import {PWAInstallPrompt} from '@components/PWAInstallPrompt';
import {useMedia} from '@hooks/useMedia';
import {h} from 'preact';
import {ScrollIndicator} from './ScrollIndicator';
import {About} from './sections/About';
import {Footer} from './sections/Footer';
import {Header} from './sections/Header';
import {Navigation} from './sections/Navigation';
import {Presentations} from './sections/Presentations';
import {Projects} from './sections/Projects';
import styles from './App.module.scss';

export default () => {
    const media = useMedia();

    return (
        <div className={styles.app}>

            {/* Custom desktop-cursor */}
            {media !== 'tablets' && media !== 'phones' && <Cursor/>}

            {/* Custom PWA Install prompt */}
            <PWAInstallPrompt/>

            {/* Header and navigation */}
            <Header/>
            <Navigation/>

            {/* Actual content split up into sections */}
            <div className={styles.content}>
                {media !== 'phones' && <ScrollIndicator/>}
                <div className={styles.sections}>
                    <Projects/>
                    <Presentations/>
                    <About/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};
