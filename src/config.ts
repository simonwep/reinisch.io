import rawProjects from '../config/projects.json';

export interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    created: string;
}

export const projects = rawProjects as {
    current: Project[];
    archive: Project[];
};
