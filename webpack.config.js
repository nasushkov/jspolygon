/**
 * Created by Nikita on 13.10.2015.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var Clean = require('clean-webpack-plugin')
var merge = require('webpack-merge');
var pkg = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var stylelint = require('stylelint');

var TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve('./');
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
process.env.BABEL_ENV = TARGET;


var common = {
    entry: ['babel-polyfill', APP_PATH],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.css$/,
                loaders: ['postcss'],
                include: APP_PATH
            },
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                include: APP_PATH
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                include: APP_PATH,
                query: {
                    cacheDirectory: true,
                    plugins: ['transform-decorators-legacy' ]
                }
            },
            {
                test: /\.png|jpg|jpeg|gif|svg?$/,
                loader: 'url-loader'
            }
        ]
    },
    postcss: function () {
        return [stylelint({
            rules: {
                'color-hex-case': 'lower'
            }
        })];
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'Kanban app'
        }),
        new webpack.ProvidePlugin({
            'Promise': 'bluebird'
        })
    ]
};

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loaders: ['style', 'css'],
                    include: APP_PATH
                },
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if(TARGET === 'build' || TARGET === 'stats') {
    module.exports = merge(common, {
        entry: {
            app: APP_PATH,
            vendor: Object.keys(pkg.dependencies)
        },
        output: {
            path: BUILD_PATH,
            filename: '[name].[chunkhash].js'
        },
        devtool: 'source-map',
        module: {
            loaders: [
                // Extract CSS during build
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', 'css'),
                    include: APP_PATH
                }
            ]
        },
        plugins: [
            new Clean([BUILD_PATH]),
            new ExtractTextPlugin('styles.[chunkhash].css'),
            new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[chunkhash].js'),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}




