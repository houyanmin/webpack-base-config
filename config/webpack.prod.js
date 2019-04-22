const webpack = require("webpack");
const { smart } = require("webpack-merge"); //合并
const optimizeCss = require("optimize-css-assets-webpack-plugin") //压缩css
const uglifyJsPlugin = require("uglifyjs-webpack-plugin"); //压缩js
const cleanWebpackPlugin = require("clean-webpack-plugin"); //用于删除/清除构建文件夹（Node v6+,Webpack v2+)
const copyWebpackPlugin = require("copy-webpack-plugin"); //用于将单个文件或整个目录复制到构建目录。
const miniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离成css
let base = require("../config/webpack.base.js")

let time = new Date();
let currentDate = time.getFullYear()+'-'+(parseInt(time.getMonth())+1)+'-'+time.getDate();
const modeText = "production";

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
    mode:modeText,
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
    //配置相对应的loader
    module:{
        //不去解析jquery中的依赖库
        noParse:/jquery|lodash/,
        //匹配文件，使用对应的(装载器)loader
        rules:[
            {   
                //匹配css结尾的文件
                test:/\.css$/,
                //注意：顺序自下向上调用
                use:[
                    miniCssExtractPlugin.loader,
                    {
                        //为css语法应用，例如css中import
                        loader:"css-loader",
                        options:{
                            // 查询参数 modules 会启用 CSS 模块规范。
                            modules: true,
                            // 生成名
                            localIdentName: '[path][name][local][hash:base64:5]'
                        }
                    },
                    //自动添加css3前缀
                    {
                        loader:"postcss-loader"
                    },
                ]
            },
            {   
                //匹配css结尾的文件
                test:/\.less$/,
                //注意：顺序自下向上调用
                use:[
                    miniCssExtractPlugin.loader,
                    {
                        //为css语法应用，例如css中import
                        loader:"css-loader",
                        options:{
                            // 查询参数 modules 会启用 CSS 模块规范。
                            modules: true,
                            // 生成名
                            localIdentName: '[path][name]-[local]-[hash:base64:5]'
                        }
                    },
                    {
                        loader:"less-loader"
                    },
                    //自动添加css3前缀
                    {
                        loader:"postcss-loader"
                    }
                ]
            }
        ]
    },
    //插件
    plugins:[
        //打包前清空
        new cleanWebpackPlugin(),
        //将单个文件或整个目录复制到构建目录。
        new copyWebpackPlugin([
            { from:"./other", to:"./other" }
        ]),
        //定义环境变量
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(modeText) }),
        //为每个chunk文件头部添加 banner
        new webpack.BannerPlugin("make "+currentDate+" by hym"),
        //抽离css
        new miniCssExtractPlugin({
            filename:"static/css/main.css"
        })
    ]
})
