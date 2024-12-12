import { Cursor } from '@components/Cursor';
import { PWAInstallPrompt } from '@components/PWAInstallPrompt';
import { useMedia } from '@hooks/useMedia';
import { FunctionalComponent } from 'preact';
import styles from './Content.module.scss';
import { EstBanner } from './EstBanner';
import { ScrollIndicator } from './ScrollIndicator';
import { About } from './sections/About';
import { ActiveProjects } from './sections/ActiveProjects';
import { Archive } from './sections/Archive';
import { Footer } from './sections/Footer';
import { Header } from './sections/Header';
import { Navigation } from './sections/Navigation';
import { Skills } from './sections/Skills';

export const Content: FunctionalComponent = () => {
    const touchDevice = 'ontouchstart' in window;
    const media = useMedia();

    return (
        <div className={styles.content}>
            {/* Custom desktop-cursor */}
            {((media !== 'tablets' && media !== 'phones') || !touchDevice) && <Cursor />}

            {/* Custom PWA Install prompt */}
            <PWAInstallPrompt />

            {/* Banner for new homepage */}
            <EstBanner />

            {/* Header and navigation */}
            <Header />
            <Navigation />

            {/* Actual content split up into sections */}
            <div className={styles.content}>
                {media !== 'phones' && <ScrollIndicator />}
                <div className={styles.sections} role="main">
                    <ActiveProjects />
                    <Archive />
                    <Skills />
                    <About />
                    <Footer />
                </div>
            </div>
        </div>
    );
};
