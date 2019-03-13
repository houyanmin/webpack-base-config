const express = require("express");

let app = express();

app.get('/user',(req, res) => {
    res.json({name:"hym"})
})

app.listen(3000);