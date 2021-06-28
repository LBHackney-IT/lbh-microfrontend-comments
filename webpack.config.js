const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config();
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

module.exports = (webpackConfigEnv, argv) => {
    const defaultConfig = singleSpaDefaults({
        orgName: 'mtfh',
        projectName: 'comments',
        webpackConfigEnv,
        argv,
    });

    return merge(defaultConfig, {
        module: {
            rules: [
                {
                    test: /\.scss$/i,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { sourceMap: false } },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        cssnano({
                                            autoprefixer: false,
                                            discardComments: {
                                                removeAll: true,
                                            },
                                        }),
                                        autoprefixer({ remove: false }),
                                    ],
                                },
                                sourceMap: false,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: false },
                        },
                    ],
                },
            ],
        },
        resolve: {
            alias: {
                '@components': path.resolve(__dirname, 'src/components'),
                '@services': path.resolve(__dirname, 'src/services'),
                '@utilities': path.resolve(__dirname, 'src/utils'),
            },
            extensions: ['.ts', '.tsx', '.js'],
        },
        externals: ['@mtfh/common'],
        plugins: [
            new webpack.EnvironmentPlugin({
                NOTES_API_URL: dotenv.NOTES_API_URL || '',
                NOTES_API_KEY: dotenv.NOTES_API_KEY || '',
                PERSON_API_URL: dotenv.PERSON_API_URL || '',
                PERSON_API_KEY: dotenv.PERSON_API_KEY || '',
            }),
        ],
    });
};
