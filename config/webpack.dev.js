const { smart } = require("webpack-merge"); //合并
const webpack = require("webpack");
let base = require("../config/webpack.base.js")

module.exports = smart(base,{
    //模式 development(开发) & production(生产)
    mode:"development",
    /**
     * 源码映射 开发建议（eval-source-map），生产建议（省略）
     */
    devtool:"eval-source-map",
    //插件
    plugins:[
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
