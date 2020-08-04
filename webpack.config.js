const path = require('path');
const HtmlWebpckPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

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
        new CopyPlugin({
            patterns: [
                { from: 'style.css', to: './' },
                { from: './js/ui', to: './js/ui' },
                { from: 'img', to: './img' },
                { from: 'fonts', to: './fonts' },
                { from: 'sounds', to: './sounds' },
                { from: 'vendor', to: './vendor' },
                { from: 'manifest.json', to: './manifest.json' }
            ]
        }),
    ],
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            // {
            //     test: /\.(png|jpg|svg|gif)$/,
            //     use: ['file-loader']
            // }
        ]
    }
};
