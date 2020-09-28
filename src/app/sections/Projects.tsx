import {Link} from '@components/Link';
import {Template} from '@components/Template';
import {FunctionalComponent, h} from 'preact';
import {config} from '@config';
import {PageSection} from '@components/PageSection';
import {useState} from 'preact/hooks';
import {ProjectCard} from './ProjectCard';
import styles from './Projects.module.scss';


export const Projects: FunctionalComponent = () => {
    const [tags, setTags] = useState<string[]>([]);

    const removeTag = (tag: string) => tags.includes(tag) && setTags(tags.filter(v => v !== tag));
    const addTag = (tag: string) => !tags.includes(tag) && setTags([...tags, tag]);

    return (
        <PageSection id="projects"
                     index={0}
                     title="Projects"
                     intro="Projects, experiments, libraries and applications I maintain, worked on, or used in the past which are representive of what I currently know and work with.">

            <div className={styles.filters} data-visible={!!tags.length}>
                {tags.map((value, index) =>
                    <button key={index}
                            data-cursor-focus={true}
                            onClick={removeTag.bind(null, value)}>
                        <span>{value}</span>
                        <span>{value}</span>
                    </button>
                )}
            </div>

            <div className={styles.projects}>
                {config.projects
                    .map((value, index) =>
                        <Template key={index} if={!tags.length || value.tags.some(tag => tags.includes(tag))}>
                            <ProjectCard project={value} addTag={addTag}/>
                        </Template>
                    )}
            </div>

            <p className={styles.bottomText}>...and of course <Link href="https://github.com/Simonwep/reinisch.io">reinisch.io itself</Link>.</p>
        </PageSection>
    );
};
