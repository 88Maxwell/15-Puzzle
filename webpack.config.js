const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
    ROOT: path.resolve(__dirname, ""),
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js')
}

const config = {
    entry: path.join(paths.JS, 'index.js'),

    output: {
        path: paths.DIST,
        filename: 'index.bundle.js'
    },

    devtool: "cheap-module-source-map",

    devServer: {
        contentBase: paths.SRC,
        stats: 'errors-only',
        // compress: true,
        port: 9000
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: path.join(paths.ROOT, 'index.html'),
            template: path.join(paths.SRC, 'index.html'),
        }),
        new ExtractTextPlugin('style.bundle.css')
    ],
    
    module: {
        rules: [
            //JS/JSX LOADER
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                'babel-loader',
                ],
            },
            //SASS/CSS LOADER
            {
                test: /\.(scss|sass)$/,
                loader: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                }),
            }

        ]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
      },
    
}

module.exports = config;
