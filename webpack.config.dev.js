var path = require('path');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');

var HTMLWebpackPlugin  = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool:'source-maps',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack-hot-middleware/client',
        './src/js/index.jsx',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins : [
        new HTMLWebpackPlugin({
            hash:true,
            title: 'eva_dev',
            filename: 'index.html',
            template: 'index.html',
            favicon: 'src/assets/images/logo/favicon/favicon.ico',
            environment: process.env.NODE_ENV
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                //loader for ES6 and babel
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react",  "react-hmre"]
                },
                include: path.join(__dirname, 'src/js')
            },{
                test: /\.scss$/,
                use: [
                    {
                        loader:"style-loader"
                    },
                    {
                        loader:"css-loader"
                    },
                    {
                        loader:"sass-loader"
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer];
                            }
                        }
                    }
                ],
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
                loader: 'url?limit=10000&mimetype=video/mp4'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};