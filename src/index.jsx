import {render, h} from 'preact';
import App from './app/App';

/* eslint-disable */
if (process.env.NODE_ENV === 'development') {

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
} else if (process.env.NODE_ENV === 'production') {
    // TODO: Add cool console log here
    // PWA?
}

render(<App/>, document.getElementById('app'));
