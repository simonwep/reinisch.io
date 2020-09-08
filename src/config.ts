export type Project = {
    title: string;
    description: string;
    tags: string[];
    link: string;
    created: string;
};

export type Config = {
    name: string;
    slogans: string[];
    projects: Project[];
};

export const config: Config = require('../config/config.json');
