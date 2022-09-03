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
                additionalData: `
                    @use 'sass:math';
                    @import './src/styles/variables.scss';
                `
            }
        }
    },

    esbuild: {
        target: 'esnext',
        jsxInject: '',
        jsxFactory: 'preact',
        jsxFragment: 'Fragment',
        logOverride: {'this-is-undefined-in-esm': 'silent'}
    },

    server: {
        port: 3010,
        host: '0.0.0.0'
    },

    define: {
        'import.meta.env.BUILD_TIME': Date.now()
    }
});
