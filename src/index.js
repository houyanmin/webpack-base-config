class A {
    a = 6661;
}
var a = () => {
    alert("123")
}

const promise = new Promise(function(resolve, reject) {
    // ... some code
    setTimeout(()=>{
        resolve(123);
    },2000)
});
promise.then((v)=>{
    console.log(v);
});

module.exports = A;