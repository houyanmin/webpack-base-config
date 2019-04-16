const { smart } = require("webpack-merge"); //合并
const webpack = require("webpack");
let base = require("../config/webpack.base.js")
const modeText = "development";

module.exports = smart(base,{
    //模式 development(开发) & production(生产)
    mode:modeText,
    /**
     * 源码映射 开发建议（eval-source-map），生产建议（省略）
     */
    devtool:"eval-source-map",
    //配置相对应的loader
    module:{
        //匹配文件，使用对应的(装载器)loader
        rules:[
            {   
                //匹配css结尾的文件
                test:/\.css$/,
                //注意：顺序自下向上调用
                use:[
                    {
                        //抽离成style
                        loader:"style-loader"
                    },
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
                    {
                        //抽离成style
                        loader:"style-loader"
                    },
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
        //定义环境变量
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(modeText) }),
        //模块热替换
        new webpack.HotModuleReplacementPlugin(),
    ],
    //启动本地服务webapck-dev-server
    devServer:{
        //本地端口
        port:"3006",
        //指向目录
        contentBase:"dist",
        //覆盖
        overlay:true,
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
                // pathRewrite:{
                //     '^/api':''
                // }
            }
        }
    }
})
