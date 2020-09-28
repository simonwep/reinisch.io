import {Cursor} from '@components/Cursor';
import {h} from 'preact';
import {ScrollIndicator} from './ScrollIndicator';
import {About} from './sections/About';
import {Footer} from './sections/Footer';
import {Header} from './sections/Header';
import {Navigation} from './sections/Navigation';
import {Presentations} from './sections/Presentations';
import {Projects} from './sections/Projects';
import styles from './App.module.scss';

export default () => (
    <div className={styles.app}>
        <Cursor/>

        {/* Header and navigation */}
        <Header/>
        <Navigation/>

        {/* Actual content split up into sections */}
        <div className={styles.sections}>
            <ScrollIndicator/>
            <Projects/>
            <Presentations/>
            <About/>
            <Footer/>
        </div>
    </div>
);
