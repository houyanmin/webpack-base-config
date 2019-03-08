const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:{
        main:"./src/main.js"
    },
    mode:"production",
    devtool:"eval-source-map",
    output:{
        filename:"[name]-bundle.js",
        path:path.resolve(__dirname,"../dist"),
        publicPath:"/"
    },
    // module:{
    //     rules:[
    //         {
    //             test:/\.js$/,
    //             use:[
    //                 {
    //                     loader:"babel-loader"
    //                 }
    //             ],
    //             exclude:/node_modules/
    //         }
    //     ],
    // },
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template:"./src/index.html"
        })
    ],
    devServer:{
        port:"3006",
        contentBase:"dist",
        hot:true,
        open:true
    }
}