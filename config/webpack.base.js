const webpack = require("webpack");
const path = require("path"); //node中path模块
const htmlWebpackPlugin = require("html-webpack-plugin"); //生成模板文件插件
const miniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离成css

module.exports = {
    //入口文件
    entry:{
        main:"./src/main.js"
    },
    resolve:{
        //自动解析确定的扩展。默认值为：
        extensions: [".js",".jsx",".json"],
        //别名
        alias:{
            _SRC_: path.resolve(__dirname, '../src'),
        }
    },
    //输出
    output:{
        //生成文件名
        filename:"static/js/bundle.[hash:8].js",
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
                    // {
                    //     //抽离成style
                    //     loader:"style-loader"
                    // },
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
                              '@babel/preset-env',
                              '@babel/preset-react',
                            ],
                            // 不采用.babelrc的配置
                            babelrc: false,
                            plugins: [
                                "dynamic-import-webpack",
                                ['@babel/plugin-proposal-decorators',{"legacy":true}],
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-proposal-export-default-from",
                                "@babel/plugin-transform-runtime",
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
                            name:"[name].[ext]",
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
                        options:{
                            name:"[name].[ext]",
                            outputPath:"static/images/"
                        }
                    }
                ]
            }
        ],
    },
    //插件
    plugins:[
        //打包进度
        new webpack.ProgressPlugin(),
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
        })
    ]
}