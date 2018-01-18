const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

var LiveReloadPlugin = require('webpack-livereload-plugin');

const extractLess = new ExtractTextPlugin({
    filename: "main.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
    },
    watch: true,
    module: {
       rules: [
            {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader'  
            }
          }, {
            test: /\.less$/,
            // use: [{
            //     loader: "style-loader" // creates style nodes from JS strings
            // }, {
            //     loader: "css-loader" // translates CSS into CommonJS
            // }, {
            //     loader: "less-loader" // compiles Less to CSS
            // }]
            use: extractLess.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Home',
            inject: true,
            template: './index.html'
        }),
        extractLess,
        new LiveReloadPlugin()
    ]
};