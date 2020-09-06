import styles from './App.module.scss';
import {h} from 'preact';
import {Header} from './components/Header';

export default () => (
    <div className={styles.app}>
        <Header/>
    </div>
);
