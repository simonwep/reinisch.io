import {Template} from '@components/Template';
import {Project} from '@config';
import {useMedia} from '@hooks/useMedia';
import {Fragment, FunctionalComponent, h} from 'preact';
import {useState} from 'preact/hooks';
import {ProjectCard} from './ProjectCard';
import styles from './Projects.module.scss';

type Props = {
    projects: Project[];
}

export const Projects: FunctionalComponent<Props> = props => {
    const {projects} = props;

    const media = useMedia();
    const [tags, setTags] = useState<string[]>([]);
    const [limit, setLimit] = useState<number>(5);

    const removeTag = (tag: string) => tags.includes(tag) && setTags(tags.filter(v => v !== tag));
    const addTag = (tag: string) => !tags.includes(tag) && setTags([...tags, tag]);

    return (
        <Fragment>
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
                {projects
                    .slice(0, media === 'phones' ? limit : projects.length)
                    .map((value, index) =>
                        <Template key={index} if={!tags.length || value.tags.some(tag => tags.includes(tag))}>
                            <ProjectCard project={value} addTag={addTag}/>
                        </Template>
                    )}
            </div>

            {
                media === 'phones' && limit < projects.length &&
                    <button className={styles.loadMoreBtn}
                            onClick={() => setLimit(limit + 5)}
                            data-cursor-focus={true}>
                        Load more ({projects.length - limit})
                    </button>
            }
        </Fragment>
    );
};
