import {create} from 'ackee-tracker';

export const ackee = create('https://ackee.reinisch.io', {
    detailed: true,
    ignoreLocalhost: true,
    ignoreOwnVisits: true
});

const createEvent = (eventId: string) => {
    return (key = 'info', value = 1) => {
        ackee.action(eventId, {
            key, value
        });
    };
};

export const track = {
    general: {
        skillFlipped: createEvent('0aa9b332-f7d3-44c2-b5b7-0b9129ef31d3'),
        pageLeft: createEvent('858ba470-7023-440c-9d7a-b06e1e501c2c'),
        navigated: createEvent('1845952b-d114-459f-bab7-00873477d7fa')
    },
    pwa: {
        prompted: createEvent('8cabdc5b-295d-49fe-816e-6aef14234e9a'),
        dismissed: createEvent('4a10c78c-550b-47d5-b412-bdc871047dbf'),
        accepted: createEvent('f9bc83d4-d4aa-4d03-8b88-f79a3134a9b0'),
        installed: createEvent('93cef400-1105-4461-864c-bba55c8cc4f9')
    }
};

window.addEventListener('appinstalled', () => {
    if (document.visibilityState === 'visible') {
        track.pwa.installed();
    }
});
