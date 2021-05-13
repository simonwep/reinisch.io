import rawConfig from '../config/config.json';

export interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    created: string;
}

export interface Config {
    name: string;
    projects: {
        current: Project[];
        archive: Project[];
    };
}

export const config = rawConfig as Config;
