const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ['./src/index.ts', './src/style.scss'],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {outputPath: '', name: 'style.css'}
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.scss']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'bacman',
            template: 'src/index.html'
        }),
        new CopyPlugin({
            patterns: [{from: 'src/assets/', to: 'assets'}]
        })
    ]
};
