/**
 * Created by 3fuyu on 16/03/02.
 */
"use strict";


var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var deps = [
    'react/dist/react.min.js',
];

var config = {
    entry: [ path.resolve(__dirname,'./src/js/app.js')],
    // entry: ['webpack/hot/dev-server', path.resolve(__dirname, './src/js/app.js')],
    //entry: [
    //    'webpack-dev-server/client?http://0.0.0.0:8080',//资源服务器地址
    //    'webpack/hot/only-dev-server',
    //    './static/js/entry.coffee'
    //],
    output: {
        path: "./assets/js/",
        publicPath: "http://127.0.0.1:3000/assets/js/",
        filename: "app.js"
    },
    resolve: {
        alias: {}
    },
    module: {
        noParse: [],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            include: __dirname,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    },
    //plugins: [
    //    new webpack.optimize.UglifyJsPlugin({
    //        compress: {
    //            warnings: false
    //        },
    //    }),
    //    new webpack.optimize.OccurenceOrderPlugin(),
    //],
    devServer: {
        historyApiFallback: true,
        hot: true,
        port: 3000,
        inline: true,
        progress: true
    },
};

deps.forEach(function (dep) {
    var depPath = path.resolve(node_modules, dep);
    config.resolve.alias[dep.split(path.sep)[0]] = depPath;
    config.module.noParse.push(depPath);
});

module.exports = config;