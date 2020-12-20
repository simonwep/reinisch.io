import {PageSection} from '@components/PageSection';
import {Projects} from '@components/Projects';
import {config} from '@config';
import {FunctionalComponent, h} from 'preact';

export const Archive: FunctionalComponent = () => {
    return (
        <PageSection id="archive" title="Archive"
                     intro="Things I once worked on. They're not up-to-date, may not work anymore but represent an important part of my journey.">
            <Projects projects={config.projects.legacy}/>
        </PageSection>
    );
};
