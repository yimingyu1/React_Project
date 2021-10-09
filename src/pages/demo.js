let p = new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log("执行完成");
        resolve("随便什么数据")
    }, 2000);
})
let a = async function t(){
    console.log(1);
    let data =  await p;
    console.log(data);
}
console.log(a());
