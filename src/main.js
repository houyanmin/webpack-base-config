import React from 'react';
import { render } from 'react-dom';

import("./main.less");
import("./index.css");
import logo from "./static/Webpack.png";

let img = new Image();
img.src = require("./static/stock.jpg");
document.getElementById("root").appendChild(img);

let xhr = new XMLHttpRequest();
xhr.open("GET",'/api/user',true);
xhr.onload = function(){
    console.log(xhr.response);
}
xhr.send();



render(<h1>webpack-base-pro</h1>,document.getElementById('root'))