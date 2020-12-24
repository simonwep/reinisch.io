export type Project = {
    title: string;
    description: string;
    tags: string[];
    link: string;
    created: string;
};

export type Config = {
    name: string;
    tags: Record<string, string>;
    projects: {
        current: Project[];
        legacy: Project[];
    };
};

export const config: Config = require('../config/config.json');
