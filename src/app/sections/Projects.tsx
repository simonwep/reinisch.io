import {FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {PageSection} from '../components/PageSection';
import styles from './Projects.module.scss';

export const Projects: FunctionalComponent = () => {
    const [projects, setProjects] = useState([]);

    return (
        <PageSection className={styles.projects}
                     title="Projects"
                     id="projects">

        </PageSection>
    );
};
