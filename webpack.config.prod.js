const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const dist = path.resolve(__dirname, 'dist');
const src = path.resolve(__dirname, 'src');

module.exports = {
    mode: 'production',
    entry: './src/index.js',

    output: {
        path: dist,
        filename: 'js/[chunkhash].js',
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss'],
        alias: {
            'react': 'preact/compat',
            'react-dom': 'preact/compat',
            '@components': path.resolve('./src/app/components'),
            '@config': path.resolve('./src/config.ts')
        }
    },

    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: [
                    'svg-inline-loader',
                    'svgo-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets'
                }
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
        minimize: true,
        splitChunks: {
            minChunks: 3
        },
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    toplevel: true,
                    mangle: true,
                    output: {
                        comments: /^!/
                    }
                }
            })
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'env.NODE_ENV': JSON.stringify('production')
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true,
            minify: {
                minifyCSS: true,
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),

        new MiniCssExtractPlugin({
            chunkFilename: 'css/bundle.[chunkhash].css',
            filename: 'css/bundle.css'
        }),

        new CopyPlugin({
            patterns: [
                {context: 'src', from: 'assets'}
            ]
        }),

        // new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin()
    ]
};
