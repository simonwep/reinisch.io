/* eslint-disable no-console */
const logStyled = s => console.log(`%c${s}`, 'background: black;color: white;padding: 0.25em 0.5em;border-radius: 0.25em;');

/* eslint-disable */
if (env.NODE_ENV === 'development') {

    // Inject react-hot-loader
    const runtime = require('react-refresh/runtime');
    runtime.injectIntoGlobalHook(window);

    if (module.hot) {
        module.hot.accept();
    }

    // See https://github.com/facebook/react/issues/16604#issuecomment-528663101
    window.$RefreshReg$ = () => {};
    window.$RefreshSig$ = () => type => type;
    logStyled('[APP] Development mode.');
} else if (env.NODE_ENV === 'production') {
    logStyled('[APP] Production mode.');
}

// Register service worker
navigator.serviceWorker.register('/sw.js').then(() => {
    logStyled('[APP] Service worker registered.');
}).catch(err => {
    logStyled('[APP] Failed to install service worker.', err);
});

require('./app');
