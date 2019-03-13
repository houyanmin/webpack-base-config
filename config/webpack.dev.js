const webpack = require("webpack");
const path = require("path"); //node中path模块
const htmlWebpackPlugin = require("html-webpack-plugin"); //生成模板文件插件
const miniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离成css
const optimizeCss = require("optimize-css-assets-webpack-plugin") //压缩css
const uglifyJsPlugin = require("uglifyjs-webpack-plugin"); //压缩js
const cleanWebpackPlugin = require("clean-webpack-plugin"); //用于删除/清除构建文件夹（Node v6+,Webpack v2+)
const copyWebpackPlugin = require("copy-webpack-plugin"); //用于将单个文件或整个目录复制到构建目录。

module.exports = {
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
    //入口文件
    entry:{
        main:"./src/main.js"
    },
    //模式 development(开发) & production(生产)
    mode:"development",
    /**
     * 源码映射 
     * source-map 单独生成一个sourcemap文件（行、列、全、大），出错有标识
     * eval-source-map 不会产生单独的文件，但可以显示行和列
     * cheap-module-source-map 不产生列，但有单独映射文件，产生后你可以保留起来
     * cheap-module-eval-source-map 不会产生文件，集成打包后的文件，不会产生列
     */
    devtool:"source-map",
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
    //输出
    output:{
        //生成文件名
        filename:"bundle.[hash:8].js",
        //生成路径
        path:path.resolve(__dirname,"../dist"),
        //生成后的前置路径
        publicPath:"/"
    },
    //配置相对应的loader
    module:{
        //匹配文件，使用对应的(装载器)loader
        rules:[
            {   
                //匹配css结尾的文件
                test:/\.css$/,
                //注意：顺序自下向上调用
                use:[
                    // {
                    //     //抽离成style
                    //     loader:"style-loader"
                    // },
                    miniCssExtractPlugin.loader,
                    {
                        //为css语法应用，例如css中import
                        loader:"css-loader"
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
                    // {
                    //     //抽离成style
                    //     loader:"style-loader"
                    // },
                    miniCssExtractPlugin.loader,
                    {
                        //为css语法应用，例如css中import
                        loader:"css-loader"
                    },
                    {
                        loader:"less-loader"
                    },
                    //自动添加css3前缀
                    {
                        loader:"postcss-loader"
                    }
                ]
            },
            {
                //匹配js结尾的文件
                test:/\.(js|jsx)$/,
                use:[
                    {
                        //es6转es5等
                        loader:"babel-loader",
                        options: {
                            // 预设规则
                            presets: [
                              '@babel/preset-env'
                            ],
                            // 不采用.babelrc的配置
                            babelrc: false,
                            plugins: [
                                "dynamic-import-webpack",
                                "@babel/plugin-proposal-class-properties"
                            ]
                        },
                        
                    }
                ],
                exclude:/node_modules/
            },
            {
                //匹配html结尾的文件
                test:/\.html$/,
                use:[
                    
                    // {
                    //     //将分离的html命名
                    //     loader:"file-loader",
                    //     options:{
                    //         name:"[name].html"
                    //     }
                    // },
                    // {
                    //     //将引入的html文件与bundle文件进行分割
                    //     loader:"extract-loader"
                    // },
                    {
                        //可对标签属性的处理等
                        loader:"html-loader",
                        options:{
                            attrs:["img:src","link:href"],
                        }
                    },
                    // {
                    //     //处理html中的图片
                    //     loader:"html-withimg-loader"
                    // },
                ]
            },
            {
                //匹配图片
                test:/\.(jpg|jpeg|png|gif)$/,
                use:[
                    // {
                    //     loader:"file-loader",
                    //     options:{
                    //         name:"static/[name].[ext]"
                    //     }
                    // }
                    {
                        //文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL(base64)
                        loader:"url-loader",
                        options:{
                            //200k
                            limit:200*1024,
                            outputPath:"static/images/"
                        }
                    }
                ]
            },
            {
                test:/\.ico$/,
                use:[
                    {
                        loader:"file-loader",
                    }
                ]
            }
        ],
    },
    //插件
    plugins:[
        //打包进度
        new webpack.ProgressPlugin(),
        //打包前清空
        new cleanWebpackPlugin(),
        //生成index.html文件
        new htmlWebpackPlugin({
            template:"./src/index.html",
            minify:{
                //清除引号
                removeAttributeQuotes:true,
                // 折叠空行变成一行
                collapseWhitespace: true,
                //解决缓存
                hash:true
            }
        }),
        //抽离css
        new miniCssExtractPlugin({
            filename:"static/css/main.css"
        }),
        //将单个文件或整个目录复制到构建目录。
        new copyWebpackPlugin([
            { from:"./other", to:"./other" }
        ]),
        //为每个chunk文件头部添加 banner。
        new webpack.BannerPlugin("make 2019 by hym")
    ],
    //启动本地服务webapck-dev-server
    devServer:{
        //本地端口
        port:"3006",
        //指向目录
        contentBase:"dist",
        //覆盖
        // overlay:true,
        //热更新
        hot:true,
        //自动打开浏览器 
        open:true,
        //压缩
        // compress:true,
        //代理
        proxy:{
            '/api':{
                target:"http://localhost:3000",
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}