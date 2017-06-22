"use strict";

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');
var webpackHotMiddleware = require ('webpack-hot-middleware');

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
    hot: true,
    clientLogLevel: "error",
    stats: "verbose",
    historyApiFallback: true
});

server.use(webpackHotMiddleware(compiler));
server.listen(3000);
