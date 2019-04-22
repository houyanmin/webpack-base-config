import React from 'react';
import { render } from 'react-dom';
import style from "./main.less";
import logo from "./static/Webpack.png";

// let img = new Image();
// img.src = require("./static/stock.jpg");
// img.className = style.max;
// document.getElementById("root").appendChild(img);

// let xhr = new XMLHttpRequest();
// xhr.open("GET",'/api/user',true);
// xhr.onload = function(){
//     console.log(xhr.response);
// }
// xhr.send();


render(<h1 className={ style.active }>webpack-base-pro</h1>,document.getElementById('root'));

// 热更新
if (module.hot) {
    console.log(123);
    // module.hot.accept('./App', () => {
    //   const NextApp = require('./App').default
    //   ReactDOM.render(
    //     <h1 className={ style.active }>webpack-base-pro</h1>,
    //     document.getElementById('app')
    //   )
    // })
  }

// tree shaking 树摇晃
// import arithmetic from "_SRC_/components/arithmetic.js";
// let arithmetic = require("./components/arithmetic.js");

//scope hoisting 作用域提升
// let a = 1;
// let b = 2;
// let c = a+b;
// console.log(arithmetic)


//懒加载
// let button = document.createElement('button');
// button.innerHTML = "懒加载资源";
// button.addEventListener('click',function(){
//     import("./components/arithmetic.js").then((data)=>{
//         console.log(data)
//     })
// })
// document.body.appendChild(button);
