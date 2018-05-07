var webpack = require("webpack");

module.exports = {
    entry: ['babel-polyfill', "./src/app/main.js"],
    output: {
        path: __dirname + "/public/build/",
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {compact: false},
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader",
                query: {compact: false},
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader'],
                exclude: [/node_modules/, /public/]
            }
        ]
    },
    node: {
        fs: "empty",
        child_process: 'empty'
    },
    mode: 'development'
}