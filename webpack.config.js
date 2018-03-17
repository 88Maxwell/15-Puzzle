const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: [
        "./src/js", 
        "webpack/hot/dev-server",
        "webpack-dev-server/client?http://localhost:8080/"
    ],
  
    output: {
        publicPath: 'http://localhost:8080/',
        filename: "build/bundle.js"
    },

    devtool: 'source-map',
  
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loaders: [
                'babel?presets[]=react,presets[]=es2015'
            ]
        },

        {
            test: /\.scss$/,
            include: /src/,
            loaders: [
                'style',
                'css',
                'sass'
            ]
        },
        
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'url',
                'img'
            ]
        }

        ]

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        stats: 'errors-only',
    }
  };
  