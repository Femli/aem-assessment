import { resolve as pathResolve, join } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathResolve(__filename, '..');

export default {
    entry: './src/index.js',
    output: {
        path: pathResolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Roman Conversion App',
            template: './src/index.html'
        })
    ],
    devServer: {
        static: {
            directory: join(__dirname, 'public'),
        },
        port: 3000,
        hot: true,
        proxy: [{
            context: ['/romannumeral'],
            target: 'http://localhost:8080'
        }]
    }
};