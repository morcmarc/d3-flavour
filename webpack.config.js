var webpack = require('webpack');
var path    = require('path');
var prod    = JSON.parse(process.env.NODE_ENV === 'prod');

module.exports = {
    entry: [
        './src/flavour.js'
    ],
    devtool: 'source-map',
    output: {
        libraryTarget: "var",
        library: "d3_flavour",
        filename: 
            prod 
            ? "./dist/d3-flavour.min.js" 
            : "./dist/d3-flavour.js"
    },
    externals: {
        "d3": "d3",
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
            }
        ]
    },
    plugins: 
        prod 
        ? [ new webpack.optimize.UglifyJsPlugin({minimize: true}) ]
        : []
}