import {useEffect, useState} from 'preact/hooks';
import {fromEvent} from 'rxjs';

export type MediaDevice = 'large-desktop' | 'desktop' | 'tablets' | 'phones';

const getMediaDevice = (): MediaDevice => {
    const root = document.documentElement;
    return getComputedStyle(root).getPropertyValue('--media') as MediaDevice;
};

/**
 * Keeps track of the current media-query applied to the page - script-wise.
 */
export const useMedia = (): MediaDevice => {
    const [media, setMedia] = useState<MediaDevice>(getMediaDevice());

    useEffect(() => {
        const subscription = fromEvent(window, 'resize')
            .subscribe(() => setMedia(getMediaDevice()));

        return () => subscription.unsubscribe();
    }, []);

    return media;
};
