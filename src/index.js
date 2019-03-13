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
console.log(123)