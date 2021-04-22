import rawConfig from '../config/config.json';

export type Project = {
    title: string;
    description: string;
    tags: string[];
    link: string;
    created: string;
};

export type Config = {
    name: string;
    projects: {
        current: Project[];
        legacy: Project[];
    };
};

export const config = rawConfig as Config;
