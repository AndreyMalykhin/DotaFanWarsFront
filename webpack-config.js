require('dotenv').config();
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var postcssVars = require('postcss-simple-vars');
var postcssNested = require('postcss-nested');
var postcssMixins = require('postcss-mixins');

var plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(
        /\/(locale-data|locale-data\/jsonp)$/, /\/(en|ru)\.js$/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.EnvironmentPlugin([
        'DFWF_DEV',
        'DFWF_BACKEND_URL',
        'DFWF_FACEBOOK_APP_ID',
        'DFWF_GOOGLE_APP_ID'
    ]),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/app/templates/app.html'),
        inject: true
    })
];
var entry = [path.resolve(__dirname, 'src/bootstrap.js')];
var cssLoader = 'css-loader?importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader';

if (process.env.DFWF_DEV) {
    cssLoader = 'style-loader!' + cssLoader;
    entry.unshift(
        'webpack-dev-server/client?http://0.0.0.0:' + process.env.DFWF_PORT,
        'webpack/hot/only-dev-server'
    );
} else {
    plugins.push(
        new ExtractTextPlugin("bundle-[contenthash].css", {allChunks: true}));
    cssLoader = ExtractTextPlugin.extract('style-loader', cssLoader);
}

module.exports = {
    resolve: {
        root: path.resolve(__dirname, 'src')
    },
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle-[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'react-hot!babel-loader?cacheDirectory'
            },
            {
                test: /\.css$/,
                loader: cssLoader
            },
            {
                test: /(\.jpeg$|\.jpg$|\.gif$|\.png$|\.woff$|\.woff2$|\.ttf$|\.eot$|\.svg$)/,
                loader: 'url-loader',
                query: {limit: 8192}
            }
        ]
    },
    plugins: plugins,
    postcss: function(webpack) {
        return [
            postcssMixins,
            postcssVars,
            postcssNested,
            autoprefixer
        ];
    },
    devServer: {
        port: process.env.DFWF_PORT,
        host: '0.0.0.0',
        contentBase: 'build',
        inline: true,
        colors: true,
        hot: true
    }
};
