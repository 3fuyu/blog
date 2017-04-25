const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    // Entry point to the project
    entry: [
        './node_modules/babel-polyfill/lib/index.js',
        path.resolve(__dirname, 'src/app/app.js'),
    ],
    // Webpack config options on how to obtain modules
    resolve: {
        // When requiring, you don't need to add these extensions
        extensions: ['', '.js', '.md', '.txt'],
        alias: {
            // material-ui requires will be searched in src folder, not in node_modules
            'material-ui': path.resolve(__dirname, '../src'),
        },
    },
    devtool: 'source-map',
    // Configuration for server
    devServer: {
        contentBase: 'build',
        // Required for webpack-dev-server
        outputPath: buildPath,
    },
    // Output file config
    output: {
        path: buildPath, // Path of output file
        filename: 'app.js', // Name of output file
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),

        // Allows error warnings but does not stop compiling. Will remove when eslint is added
        new webpack.NoErrorsPlugin(),
        // Transfer Files
        new CopyWebpackPlugin([
            {from: 'src/www/css', to: 'css'},
            {from: 'src/www/images', to: 'images'},
            {from: 'src/www/index.html'},
            {from: 'src/www/versions.json'},
            {from: 'src/app/js/lib/ZeroClipboard.swf'},
        ]),
    ],
    module: {
        // Allow loading of non-es5 js files.
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.txt$/,
                loader: 'raw-loader',
                include: path.resolve(__dirname, 'src/app/components/raw-code'),
            },
            {
                test: /\.md$/,
                loader: 'raw-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.(less)$/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ],
    },
    eslint: {
        configFile: '../.eslintrc',
    },
};

module.exports = config;
