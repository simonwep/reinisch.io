import {config} from '../../config';
import {LettersSpinner} from '../components/LettersSpinner';
import {FunctionalComponent, h} from 'preact';
import styles from './Header.module.scss';

export const Header: FunctionalComponent = () => (
    <header className={styles.header} id="home">
        <h1>{config.name}</h1>
        <LettersSpinner interval={2000}
                        speed={350}
                        words={config.slogans}
                        className={styles.spinner}/>
    </header>
);
