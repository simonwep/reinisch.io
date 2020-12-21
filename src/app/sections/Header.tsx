import {SpinningHeadline} from '@components/SpinningHeadline';
import {config} from '@config';
import {sections} from '@store/sections';
import {FunctionalComponent, h} from 'preact';
import {useEffect} from 'preact/hooks';
import styles from './Header.module.scss';

export const Header: FunctionalComponent = () => {
    useEffect(() => {
        sections.sync({id: 'home', title: 'Home'});
    }, []);

    return (
        <header className={styles.header} id="home">
            <h1>{config.name}</h1>
            <SpinningHeadline interval={2000}
                              speed={350}
                              words={config.slogans}
                              className={styles.spinner}/>
        </header>
    );
};
