const path = require('path');
const HtmlWebpckPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './js/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpckPlugin({
            template: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                // { from: 'style.css', to: './' },
                // { from: './js/ui', to: './js/ui' },
                { from: 'img/favicons', to: './img' },
                { from: 'img/bg-static-blur4.svg', to: './img'},
                { from: 'img/bg-static-blur4-light.svg', to: './img'},
                // { from: 'fonts', to: './fonts' },
                { from: 'sounds', to: './sounds' },
                // { from: 'vendor', to: './vendor' },
                { from: 'manifest.json', to: './manifest.json' },
                // { from: 'img/faviconGreen.png', to: './img/faviconGreen.png' },

            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ogg|mp3)$/,
                use: ['file-loader']
            },
        ]
    }
};
