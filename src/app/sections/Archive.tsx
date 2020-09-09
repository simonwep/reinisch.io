import {config} from '@config';
import {FunctionalComponent, h} from 'preact';
import {PageSection} from '@components/PageSection';
import {ProjectCard} from './ProjectCard';
import styles from './Projects.module.scss';

export const Archive: FunctionalComponent = () => (
    <PageSection title="Archive"
                 intro="Things I once worked on. On some of them I spent a great amount of time so I felt like I should include them here."
                 id="archive"
                 index={1}>
        <div className={styles.projects}>
            {config.archive.map((value, index) =>
                <ProjectCard project={value} key={index}/>
            )}
        </div>
    </PageSection>
);
