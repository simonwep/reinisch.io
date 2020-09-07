export type Config = {
    name: string;
    slogans: string[];
};

export const config: Config = require('../config/config.json');
