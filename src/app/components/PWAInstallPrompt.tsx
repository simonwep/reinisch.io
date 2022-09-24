import { useMedia } from '@hooks/useMedia';
import { track } from '@utils/ackee';
import { uid } from '@utils/uid';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './PWAInstallPrompt.module.scss';

export const PWAInstallPrompt: FunctionalComponent = () => {
    const [event, setEvent] = useState<null | BeforeInstallPromptEvent>(null);
    const [installTimeout, setInstallTimeout] = useState(-1);
    const media = useMedia();

    const submit = ({ outcome }: { outcome: 'accepted' | 'dismissed' }) => {
        const accepted = outcome === 'accepted';
        track.pwa[accepted ? 'accepted' : 'dismissed']();

        // Permanently remember user choice
        localStorage.setItem('pwa-prompt-timestamp', JSON.stringify(Date.now()));
        setEvent(null);
    };

    const installEvent = (evt: BeforeInstallPromptEvent) => {
        const rawTimestamp = localStorage.getItem('pwa-prompt-timestamp');
        const timestamp = rawTimestamp ? JSON.parse(rawTimestamp) : null;

        // If the user previously dismissed the installation and a day hasn't passed yet ignore the event
        if (timestamp && Date.now() - timestamp < 86400000) {
            return;
        }

        // Wait at least 30 seconds before interrupting the users experience.
        setInstallTimeout(
            setTimeout(() => {
                setEvent(evt);
                void evt.userChoice.then(submit);
            }, 15000) as unknown as number
        );

        track.pwa.prompted();
    };

    const prompt = () => {
        void event?.prompt();
        setEvent(null);
    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    useEffect(() => {
        window.addEventListener('beforeinstallprompt' as any, installEvent);
        return () => {
            window.removeEventListener('beforeinstallprompt' as any, installEvent);
            clearTimeout(installTimeout);
        };
    }, []);

    const descriptionId = uid('aria');
    return (
        <div className={styles.pwaInstallPrompt} data-visible={!!event} role="dialog" aria-labelledby={descriptionId}>
            <p id={descriptionId}>Add to {media === 'tablets' || media === 'phones' ? 'Homescreen' : 'Desktop'}?</p>

            <button className={styles.addBtn} data-cursor-focus={true} aria-label="Install website" onClick={prompt}>
                Yes, please
            </button>

            <button
                className={styles.closeBtn}
                data-cursor-focus={true}
                aria-label="Dismiss installation"
                onClick={() => submit({ outcome: 'dismissed' })}
            >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path d="M16,15L16,15c-0.4,0.4-0.4,1,0,1.4l6.9,6.9c0.4,0.4,0.4,1,0,1.4L16,31.6c-0.4,0.4-0.4,1,0,1.4h0c0.4,0.4,1,0.4,1.4,0l6.9-6.9c0.4-0.4,1-0.4,1.4,0l6.9,6.9c0.4,0.4,1,0.4,1.4,0l0,0c0.4-0.4,0.4-1,0-1.4l-6.9-6.9c-0.4-0.4-0.4-1,0-1.4l6.9-6.9c0.4-0.4,0.4-1,0-1.4v0c-0.4-0.4-1-0.4-1.4,0l-6.9,6.9c-0.4,0.4-1,0.4-1.4,0L17.4,15C17,14.6,16.4,14.6,16,15z" />
                </svg>
            </button>
        </div>
    );
};
