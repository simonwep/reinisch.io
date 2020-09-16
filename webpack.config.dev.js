const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const dist = path.resolve(__dirname, 'dist');
const src = path.resolve(__dirname, 'src');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        'sw': './src/sw.ts',
        'js/main': './src/index.js',
    },

    output: {
        path: dist,
        filename: '[name].js',
        globalObject: `(() => {
            if (typeof self !== 'undefined') {
                return self;
            } else if (typeof window !== 'undefined') {
                return window;
            } else if (typeof global !== 'undefined') {
                return global;
            } else {
                return Function('return this')();
            }
        })()`
    },

    devServer: {
        port: 3003,
        disableHostCheck: true,
        historyApiFallback: true,
        clientLogLevel: 'none',
        stats: 'errors-only',
        quiet: true,
        host: '0.0.0.0',
        liveReload: false,
        overlay: false,
        inline: true,
        hot: true
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss'],
        alias: {
            'react': 'preact/compat',
            'react-dom': 'preact/compat',
            '@components': path.resolve('./src/app/components'),
            '@config': path.resolve('./src/config.ts'),
            '@utils': path.resolve('./src/utils')
        }
    },

    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(png|jpe?g|webp|gif|eot|ttf|woff|woff2)$/i,
                loader: 'file-loader'
            },
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                auto: true,
                                localIdentName: '[local]__[name]'
                            }
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            additionalData: '@import "src/styles/_variables.scss";'
                        }
                    }
                ]
            },
            {
                test: /\.[jt]sx?$/,
                include: src,
                use: 'babel-loader'
            }
        ]
    },

    optimization: {
        splitChunks: {
            minChunks: 3
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            'env.NODE_ENV': JSON.stringify('development')
        }),

        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: true
        }),

        new CopyPlugin({
            patterns: [
                {context: 'src', from: 'assets'}
            ]
        }),

        new ProgressBarPlugin()
    ]
};
