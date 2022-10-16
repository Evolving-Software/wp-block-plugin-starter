// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { basename, dirname, resolve } = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';
const TerserPlugin = require('terser-webpack-plugin');
const browserslist = require('browserslist');
/**
 * WordPress dependencies
 */
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const postcssPlugins = require('@wordpress/postcss-plugins-preset');


const stylesHandler = MiniCssExtractPlugin.loader;

const {
    fromConfigRoot,
    hasBabelConfig,
    hasArgInCLI,
    hasCssnanoConfig,
    hasPostCSSConfig,
    getWordPressSrcDirectory,
    getWebpackEntryPoints,
    getRenderPropPaths,
} = require('@wordpress/scripts/utils');

const mode = isProduction ? 'production' : 'development';
let target = 'browserslist';
if (!browserslist.findConfig('.')) {
    target += ':' + fromConfigRoot('.browserslistrc');
}
const hasReactFastRefresh = hasArgInCLI('--hot') && !isProduction;


const config = {
    mode,
    target,
    entry: getWebpackEntryPoints,
    output: {
        filename: '[name].js',
        path: resolve(process.cwd(), 'build'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    // Use `.swcrc` to configure swc
                    loader: "swc-loader"
                }
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            }

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        alias: {
            'lodash-es': 'lodash',
        },
        extensions: ['.jsx', '.ts', '.tsx', '...'],
    },
    optimization: {
        // Only concatenate modules in production, when not analyzing bundles.
        concatenateModules: isProduction && !process.env.WP_BUNDLE_ANALYZER,
        splitChunks: {
            cacheGroups: {
                style: {
                    type: 'css/mini-extract',
                    test: /[\\/]style(\.module)?\.(sc|sa|c)ss$/,
                    chunks: 'all',
                    enforce: true,
                    name(_, chunks, cacheGroupKey) {
                        const chunkName = chunks[0].name;
                        return `${dirname(
                            chunkName
                        )}/${cacheGroupKey}-${basename(chunkName)}`;
                    },
                },
                default: false,
            },
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    output: {
                        comments: /translators:/i,
                    },
                    compress: {
                        passes: 2,
                    },
                    mangle: {
                        reserved: ['__', '_n', '_nx', '_x'],
                    },
                },
                extractComments: false,
            }),
        ],
    },
    plugins: [
        // During rebuilds, all webpack assets that are not used anymore will be
        // removed automatically. There is an exception added in watch mode for
        // fonts and images. It is a known limitations:
        // https://github.com/johnagan/clean-webpack-plugin/issues/159
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['!fonts/**', '!images/**'],
            // Prevent it from deleting webpack assets during builds that have
            // multiple configurations returned in the webpack config.
            cleanStaleWebpackAssets: false,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/block.json',
                    context: getWordPressSrcDirectory(),
                    noErrorOnMissing: true,
                    transform(content, absoluteFrom) {
                        const convertExtension = (path) => {
                            return path.replace(/\.(j|t)sx?$/, '.js');
                        };

                        if (basename(absoluteFrom) === 'block.json') {
                            const blockJson = JSON.parse(content.toString());
                            ['viewScript', 'script', 'editorScript'].forEach(
                                (key) => {
                                    if (Array.isArray(blockJson[key])) {
                                        blockJson[key] =
                                            blockJson[key].map(
                                                convertExtension
                                            );
                                    } else if (
                                        typeof blockJson[key] === 'string'
                                    ) {
                                        blockJson[key] = convertExtension(
                                            blockJson[key]
                                        );
                                    }
                                }
                            );

                            return JSON.stringify(blockJson, null, 2);
                        }

                        return content;
                    },
                },
                {
                    from: '**/*.php',
                    context: getWordPressSrcDirectory(),
                    noErrorOnMissing: true,
                    filter: (filepath) => {
                        return (
                            process.env.WP_COPY_PHP_FILES_TO_DIST ||
                            renderPaths.includes(filepath)
                        );
                    },
                },
            ],
        }),
        // The WP_BUNDLE_ANALYZER global variable enables a utility that represents
        // bundle content as a convenient interactive zoomable treemap.
        process.env.WP_BUNDLE_ANALYZER && new BundleAnalyzerPlugin(),
        // MiniCSSExtractPlugin to extract the CSS thats gets imported into JavaScript.
        new MiniCSSExtractPlugin({ filename: '[name].css' }),
        // React Fast Refresh.
        hasReactFastRefresh && new ReactRefreshWebpackPlugin(),
        // WP_NO_EXTERNALS global variable controls whether scripts' assets get
        // generated, and the default externals set.
        !process.env.WP_NO_EXTERNALS &&
        new DependencyExtractionWebpackPlugin(),
    ].filter(Boolean),
};


module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        // WP_DEVTOOL global variable controls how source maps are generated.
        // See: https://webpack.js.org/configuration/devtool/#devtool.
        config.devtool = process.env.WP_DEVTOOL || 'source-map';
        config.module.rules.unshift({
            test: /\.(j|t)sx?$/,
            exclude: [/node_modules/],
            use: require.resolve('source-map-loader'),
            enforce: 'pre',
        });
        config.devServer = {
            devMiddleware: {
                writeToDisk: true,
            },
            allowedHosts: 'auto',
            host: 'localhost',
            port: 3000,
            proxy: {
                URL: {
                    target: 'themedev.local',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/URL': '/',
                    },
                    headers: {
                        Host: 'themedev.local',
                    },
                },

            },
        };
    }
    return config;
};
