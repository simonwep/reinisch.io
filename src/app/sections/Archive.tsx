import { Link } from '@components/Link';
import { PageSection } from '@components/PageSection';
import { Projects } from '@components/Projects';
import styles from '@components/Projects.module.scss';
import { projects } from '@config';
import { FunctionalComponent } from 'preact';

export const Archive: FunctionalComponent = () => {
    return (
        <PageSection
            id="archive"
            title="Archive"
            intro="Things I once worked on. They're not up-to-date, may not work anymore but represent an important part of my journey."
        >
            <Projects projects={projects.archive} mobileLimitBase={3} />
            <p className={styles.bottomText}>
                ...any <Link href="https://github.com/simonwep?tab=repositories">many more</Link>.
            </p>
        </PageSection>
    );
};
