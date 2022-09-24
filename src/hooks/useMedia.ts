import { StateUpdater, useEffect, useState } from 'preact/hooks';

export type MediaDevice = 'large-desktop' | 'desktop' | 'tablets' | 'phones';

const getMediaDevice = (): MediaDevice => {
    const root = document.documentElement;
    return getComputedStyle(root).getPropertyValue('--media').trim() as MediaDevice;
};

const hooks: Set<StateUpdater<MediaDevice>> = new Set();

window.addEventListener('resize', () => {
    const mediaDevice = getMediaDevice();
    hooks.forEach((update) => update(mediaDevice));
});

export const useMedia = (): MediaDevice => {
    const [media, setMedia] = useState<MediaDevice>(getMediaDevice());

    useEffect(() => {
        hooks.add(setMedia);
        return () => hooks.delete(setMedia);
    }, []);

    return media;
};
