import { Link } from '@components/Link';
import { PageSection } from '@components/PageSection';
import { Projects } from '@components/Projects';
import styles from '@components/Projects.module.scss';
import { projects } from '@config';
import { FunctionalComponent } from 'preact';

export const ActiveProjects: FunctionalComponent = () => (
    <PageSection
        id="projects"
        title="Projects"
        intro="Projects, experiments, libraries and applications I (still) maintain which are representative of what I currently know and work with."
    >
        <Projects projects={projects.current} />
        <p className={styles.bottomText}>
            ...and of course <Link href="https://github.com/simonwep/reinisch.io">reinisch.io itself</Link>.
        </p>
    </PageSection>
);
