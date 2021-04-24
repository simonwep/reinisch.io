import {useEffect, useState} from 'preact/hooks';
import {fromEvent} from 'rxjs';

export type MediaDevice = 'large-desktop' | 'desktop' | 'tablets' | 'phones';

const getMediaDevice = (): MediaDevice => {
    const root = document.documentElement;

    return getComputedStyle(root)
        .getPropertyValue('--media')
        .trim() as MediaDevice;
};

export const useMedia = (): MediaDevice => {
    const [media, setMedia] = useState<MediaDevice>(getMediaDevice());

    useEffect(() => {
        const subscription = fromEvent(window, 'resize')
            .subscribe(() => setMedia(getMediaDevice()));

        return () => subscription.unsubscribe();
    }, []);

    return media;
};
