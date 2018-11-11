const path = require('path');
const SassPlugin = require('sass-webpack-plugin');
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
        filename: 'app.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css', to: 'css'},
            { from: 'node_modules/@fortawesome/fontawesome-free/css/regular.min.css', to: 'css'},
            { from: 'node_modules/@fortawesome/fontawesome-free/webfonts', to: 'webfonts/'},
            { from: 'src/assets/css', to: 'css' },
            { from: 'src/assets/images', to: 'images' }
        ]),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            title: 'Open DnD',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            minify: false
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                'css/fontawesome.min.css',
                'css/regular.min.css',
                'css/main.css'
            ],
            append: false
        }),
        new SassPlugin({'./src/assets/css/main.scss': 'css/main.css'})
    ]
};
