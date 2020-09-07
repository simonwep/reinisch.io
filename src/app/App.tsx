import styles from './App.module.scss';
import {h} from 'preact';
import {Header} from './sections/Header';
import {Navigation} from './sections/Navigation';
import {Projects} from './sections/Projects';

export default () => (
    <div className={styles.app}>
        <Header/>
        <Navigation/>
        <Projects/>
    </div>
);
