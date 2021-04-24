export interface UserMedia {
    reducedMotion: boolean;
    colorScheme: 'light' | 'dark' | null;
}

const prefersLightScheme = matchMedia('(prefers-color-scheme: light)');
const prefersDarkScheme = matchMedia('(prefers-color-scheme: dark)');

export const media: UserMedia = {
    reducedMotion: matchMedia('(prefers-reduced-motion)').matches,
    colorScheme: prefersLightScheme ? 'light' : prefersDarkScheme ? 'dark' : null
};
