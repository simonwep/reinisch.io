import preact from '@preact/preset-vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
import manifest from './public/manifest.json';

export default defineConfig({
    plugins: [
        preact(),
        optimizeCssModules(),
        tsconfigPaths(),
        VitePWA({
            strategies: 'injectManifest',
            registerType: 'autoUpdate',
            manifest: manifest as any,
            filename: 'sw.ts',
            srcDir: 'src',
        }),
    ],

    css: {
        modules: {},
        preprocessorOptions: {
            scss: {
                additionalData: `@use './src/styles/injected.scss' as *;`,
            },
        },
    },

    esbuild: {
        target: 'esnext',
        jsxInject: '',
        jsxFactory: 'preact',
        jsxFragment: 'Fragment',
        logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },

    server: {
        port: 3010,
        host: '0.0.0.0',
    },

    define: {
        'import.meta.env.BUILD_TIME': Date.now(),
    },
});
