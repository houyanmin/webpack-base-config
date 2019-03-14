const webpack = require("webpack");
const { smart } = require("webpack-merge"); //合并
const optimizeCss = require("optimize-css-assets-webpack-plugin") //压缩css
const uglifyJsPlugin = require("uglifyjs-webpack-plugin"); //压缩js
const cleanWebpackPlugin = require("clean-webpack-plugin"); //用于删除/清除构建文件夹（Node v6+,Webpack v2+)
const copyWebpackPlugin = require("copy-webpack-plugin"); //用于将单个文件或整个目录复制到构建目录。
let base = require("../config/webpack.base.js")

let time = new Date();
let currentDate = time.getFullYear()+'-'+time.getMonth()+'-'+time.getDate();

module.exports = smart(base,{
    //优化
    optimization:{
        minimizer:[
            //压缩css
            new optimizeCss(),
            //压缩js
            new uglifyJsPlugin({
                //缓存
                cache:true,
                //是否并发打包
                parallel:true,
                //源码映射
                sourceMap:true
            })
        ]
    },
    //模式 development(开发) & production(生产)
    mode:"production",
    //是否开启监听
    watch:true,
    //监听并打包
    watchOptions: {
        //重新构建前增加延迟
        aggregateTimeout: 500,
        //指定毫秒为单位进行轮询
        poll: 1000,
        //不监听
        ignored: /node_modules/
    },
    module:{
        //不去解析jquery中的依赖库
        noParse:/jquery|lodash/
    },
    //插件
    plugins:[
        //打包前清空
        new cleanWebpackPlugin(),
        //将单个文件或整个目录复制到构建目录。
        new copyWebpackPlugin([
            { from:"./other", to:"./other" }
        ]),
        //为每个chunk文件头部添加 banner。
        new webpack.BannerPlugin("make "+currentDate+" by hym")
    ]
})
