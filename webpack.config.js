const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: 'defaults' }],
                            ['@babel/preset-react', { targets: 'defaults' }],
                        ],
                    }
                }
            }, 
            {
                test:/\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                exclude: /images/,
                test: /\.(png|jpe?g|gif)$/i,
                    use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './index.html',
          }),
    ],
    devServer: {
        static: {
          publicPath: '/build',
          directory: path.resolve(__dirname, 'build'),
        },
        proxy: {
          '/api/*': 'http://localhost:3000/',
          '/home': 'http://localhost:3000/'
        },
				compress: true,
				port: 8080,
      },
}