import preact from '@preact/preset-vite';
import {resolve} from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';
import manifest from './public/manifest.json';

export default defineConfig({
    plugins: [
        preact(),
        VitePWA({
            strategies: 'injectManifest',
            registerType: 'autoUpdate',
            manifest: manifest as any,
            filename: 'sw.ts',
            srcDir: 'src'
        })
    ],

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss'],
        alias: {
            '@components': resolve('./src/app/components'),
            '@config': resolve('./src/config.ts'),
            '@hooks': resolve('./src/hooks'),
            '@utils': resolve('./src/utils'),
            '@store': resolve('./src/store')
        }
    },

    css: {
        modules: {},
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/styles/variables.scss";`
            }
        }
    },

    esbuild: {
        target: 'esnext',
        jsxInject: '',
        jsxFactory: 'preact',
        jsxFragment: 'Fragment'
    },

    server: {
        port: 3010
    },

    define: {
        'env': {
            'NODE_ENV': process.env.NODE_ENV,
            'BUILD_TIME': Date.now()
        }
    }
});
