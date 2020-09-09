import {CircleCursor} from '@components/CircleCursor';
import styles from './App.module.scss';
import {h} from 'preact';
import {Archive} from './sections/Archive';
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
        <Projects/>
        <Archive/>
    </div>
);
