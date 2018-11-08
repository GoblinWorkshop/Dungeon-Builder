const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development', // 'production',
    entry: {
        bundle: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'assets/css', to: 'css' },
            { from: 'assets/images', to: 'images' }
        ]),
        new HtmlWebpackPlugin({
            title: 'Open DnD',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            minify: true
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                'css/main.css'
            ],
            append: false
        })
    ]
};
