/* eslint-disable */
if (env.NODE_ENV === 'development') {

    // Inject react-hot-loader
    const runtime = require('react-refresh/runtime');
    runtime.injectIntoGlobalHook(window);

    if (module.hot) {
        module.hot.accept();
    }

    // See https://github.com/facebook/react/issues/16604#issuecomment-528663101
    window.$RefreshReg$ = () => {
    };
    window.$RefreshSig$ = () => type => type;
    console.log('[APP] Development mode.');
} else if (env.NODE_ENV === 'production') {
    // TODO: Add cool console log here
    // TODO: PWA?
}

require('./app');
