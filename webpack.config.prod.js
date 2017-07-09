var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HTMLWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

var path = require('path');
var webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    devtool: 'inline-source-map',
    entry:[
        './src/styles/global.scss',
        './src/js/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                //loader for ES6 and babel
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"]
                },
                include: path.join(__dirname, 'src/js')
            },{
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },{
                test: /\.scss$/,
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [autoprefixer];
                    }
                },
                include: path.join(__dirname, 'src/styles')
            },{
                test: /\.(ttf|jpg|jpeg|png)$/,
                loader: 'url-loader?limit=25000',
                include: path.join(__dirname, 'src/assets/images')
            },{
                test: /\.svg$/,
                loader: 'file-loader',
                include: path.join(__dirname, 'src/assets/images')
            },{
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },{
                test: /\.(ttf|otf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },{
                test: /\.mp4$/,
                loader: 'url-loader?limit=10000&mimetype=video/mp4'
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            hash:true,
            title: 'eva',
            filename: 'index.html',
            template: 'index.html',
            environment: process.env.NODE_ENV
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        extractSass
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};