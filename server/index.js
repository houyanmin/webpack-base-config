let express = require("express");
let app = express();
// let webpack = require("webpack");

//中间件
// let devMiddle = require("webpack-dev-middleware");
// let hotMiddle = require("webpack-hot-middleware");
// let config = require("../config/webpack.dev.js");
// let compiler = webpack(config);
let port = 3000;


// app.use(devMiddle(compiler));
// // //实时更新
// app.use(hotMiddle(compiler));

app.get('/api/user',(req,res) =>{
    res.json({ name:'123' })
})
app.listen(port,function(){
    console.log('\n Project is running at \033[34m http://localhost:'+port+'\033[34m \n')
});