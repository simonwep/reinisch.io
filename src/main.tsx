import '@utils/ackee';
import {render} from 'preact';
import {registerSW} from 'virtual:pwa-register';
import App from './app/App';
import './styles/_global.scss';

/* eslint-disable no-console */
const logStyled = (s: string): void => {
    console.log(`%c${s}`, 'background: black;color: white;padding: 0.25em 0.5em;border-radius: 0.25em;');
};

if (env.NODE_ENV === 'development') {
    logStyled('[APP] Development mode 🔧');
} else if (env.NODE_ENV === 'production') {
    logStyled(`[APP] Build from ${new Date(env.BUILD_TIME).toLocaleString()}`);
    logStyled('[APP] Production mode 🎉');
}

registerSW({
    onOfflineReady: () => logStyled('[APP] Service worker registered.'),
    onNeedRefresh: () => logStyled('[APP] New content available.')
});

render(<App/>, document.getElementById('app') as HTMLElement);
