import {FunctionalComponent, h} from 'preact';
import {config} from '@config';
import {PageSection} from '@components/PageSection';
import {ProjectCard} from './ProjectCard';
import styles from './Projects.module.scss';

export const Projects: FunctionalComponent = () => (
    <PageSection title="Projects"
                 id="projects">
        <div className={styles.projects}>
            {config.projects.map((value, index) =>
                <ProjectCard project={value} key={index}/>
            )}
        </div>
    </PageSection>
);
