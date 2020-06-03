const path = require('path')
const copyWebpackPlugin = require('copy-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new copyWebpackPlugin({
            patterns: [
                {
                    from: __dirname + '/src/assets',
                    to: './assets'
                }
            ]
        }),
        new htmlWebpackPlugin({
            hot: true,
            host: "0.0.0.0",
            filename: 'index.html', //通过模板生成的文件名
            template: __dirname + '/index.html',//模板路径
            inject: true, //是否自动在模板文件添加 自动生成的js文件链接
            title: '这个是WebPack Demo',
            minify:{
                removeComments:true //是否压缩时 去除注释
            }
        }),
        new uglifyJsPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8088,
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {"^/api" : ""}
            }
        }
    }
}