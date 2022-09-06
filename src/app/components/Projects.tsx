import { Project } from '@config';
import { useMedia } from '@hooks/useMedia';
import { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.scss';

interface Props {
    projects: Project[];
    mobileLimitBase?: number;
}

export const Projects: FunctionalComponent<Props> = (props) => {
    const { projects, mobileLimitBase = 5 } = props;

    const media = useMedia();
    const [tags, setTags] = useState<string[]>([]);
    const [limit, setLimit] = useState<number>(mobileLimitBase);

    const removeTag = (tag: string) => tags.includes(tag) && setTags(tags.filter((v) => v !== tag));
    const addTag = (tag: string) => !tags.includes(tag) && setTags([...tags, tag]);

    return (
        <>
            <div className={styles.filters} data-visible={!!tags.length}>
                {tags.map((value, index) => (
                    <button key={index} data-cursor-focus={true} onClick={removeTag.bind(null, value)}>
                        <span>{value}</span>
                        <span>{value}</span>
                    </button>
                ))}
            </div>

            <div className={styles.projects}>
                {projects
                    .slice(0, media === 'phones' ? limit : projects.length)
                    .filter((value) => !tags.length || value.tags.some((tag) => tags.includes(tag)))
                    .map((value, index) => (
                        <ProjectCard key={index} project={value} addTag={addTag} />
                    ))}
            </div>

            {media === 'phones' && limit < projects.length && (
                <button className={styles.loadMoreBtn} onClick={() => setLimit(limit + 5)} data-cursor-focus={true}>
                    Load more ({projects.length - limit})
                </button>
            )}
        </>
    );
};
