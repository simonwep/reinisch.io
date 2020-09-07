import styles from './App.module.scss';
import {h} from 'preact';
import {Header} from './components/Header';
import {Navigation} from './components/Navigation';
import {Projects} from './components/Projects';

export default () => (
    <div className={styles.app}>
        <Header/>
        <Navigation/>
        <Projects/>
    </div>
);
