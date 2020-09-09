import {FunctionalComponent, h} from 'preact';
import {config} from '@config';
import {PageSection} from '@components/PageSection';
import {ProjectCard} from './ProjectCard';
import styles from './Projects.module.scss';

export const Projects: FunctionalComponent = () => (
    <PageSection title="Projects"
                 intro="Projects, experiments, libraries and applications I maintain, worked on, or used in the past which are representive of what I currently know and work with."
                 id="projects"
                 index={0}>
        <div className={styles.projects}>
            {config.projects.map((value, index) =>
                <ProjectCard project={value} key={index}/>
            )}
        </div>
    </PageSection>
);
