import {CircleCursor} from '@components/CircleCursor';
import styles from './App.module.scss';
import {h} from 'preact';
import {ScrollIndicator} from './ScrollIndicator';
import {About} from './sections/About';
import {Archive} from './sections/Archive';
import {Footer} from './sections/Footer';
import {Header} from './sections/Header';
import {Navigation} from './sections/Navigation';
import {Projects} from './sections/Projects';

export default () => (
    <div className={styles.app}>
        <CircleCursor/>

        {/* Header and navigation */}
        <Header/>
        <Navigation/>

        {/* Actual content split up into sections */}
        <div className={styles.sections}>
            <ScrollIndicator/>
            <Projects/>
            <Archive/>
            <About/>
            <Footer/>
        </div>
    </div>
);
