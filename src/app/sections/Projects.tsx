import {FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import styles from './Projects.module.scss';

export const Projects: FunctionalComponent = () => {
    const [projects, setProjects] = useState([]);
    return (
        <div className={styles.projects} id="projects">

        </div>
    );
};
