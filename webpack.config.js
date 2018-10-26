const path = require('path')
const webpack = require('webpack')
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    mode: ( process.env.NODE_ENV ? process.env.NODE_ENV : 'development' ),
    devtool: ( 'production' === process.env.NODE_ENV ? false : 'cheap-module-eval-source-map' ),
    entry: 'production' === process.env.NODE_ENV ? [
            'babel-polyfill',
            './client/index.js'
        ] : [
            'babel-polyfill',
            'webpack-hot-middleware/client',
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            './client/index.js'
        ],
    plugins: ( 'production' === process.env.NODE_ENV) ? [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                },
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                mangle: true,
                unused: true,
                dead_code: true, // big one--strip code that will never execute
                warnings: false, // good for prod apps so users can't peek behind curtain
                drop_debugger: true,
                conditionals: true,
                evaluate: true,
                drop_console: true, // strips console statements
                sequences: true,
                booleans: true,
                compressor: {
                    screw_ie8: true,
                    warnings: false
                },
                output: {
                    comments: false,
                    screw_ie8: true
                }
            }),
            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ] : [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('dev')
                },
            }), new webpack.ProgressPlugin(function (percentage, message) {
                var MOVE_LEFT = new Buffer('1b5b3130303044', 'hex').toString();
                var CLEAR_LINE = new Buffer('1b5b304b', 'hex').toString();
                process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + '%: ' + message + MOVE_LEFT);
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ],
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/static/",
        filename: "bundle.js",
    },
    module: {
        loaders: 'production' === process.env.NODE_ENV  ? [
                {
                    test: /\.(js|jsx)$/,
                    include: [path.join(__dirname, 'common'), path.join(__dirname, 'client')],
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        cacheDirectory: true,
                        presets: ["es2015", "react", "react-optimize"],
                        plugins: [["transform-react-constant-elements"],
                            ["transform-react-inline-elements"],
                            ['transform-object-rest-spread'],
                            ['transform-class-properties'],
                            ["transform-decorators-legacy"],
                            ["transform-runtime"]
                        ],
                    }
                },
            ] : [
                {
                    test: /\.(js|jsx)$/,
                    include: __dirname,
                    exclude: /(node_modules)/,
                    loader: 'babel',
                    query: {
                        cacheDirectory: true,
                        presets: ["es2015", "react", "react-optimize"],
                        plugins: [["transform-react-constant-elements"],
                            ["transform-react-inline-elements"],
                            ['transform-object-rest-spread'],
                            ['transform-class-properties'],
                            ["transform-decorators-legacy"],
                            ["transform-runtime"],
                            ['react-transform', {
                                transforms: [
                                    {
                                        transform: 'react-transform-hmr',
                                        imports: ['react'],
                                        locals: ['module'],
                                    }, {
                                        transform: 'react-transform-catch-errors',
                                        imports: ['react', 'redbox-react'],
                                    },
                                ],
                            }],
                        ],
                    }
                },
            ]
    }
}