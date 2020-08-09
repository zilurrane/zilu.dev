const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_env, argv) => ({
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: argv.mode === 'production' ? `[name].[contentHash].js` : `[name].[hash].js`,
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules\/(?!bootstrap).*/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                autoprefixer({})
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=10000&name=img/[name].[ext]'
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: argv.mode === 'production' ? `[name].[contentHash].css` : `[name].[hash].css`,
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
        moduleIds: 'hashed',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    }
});