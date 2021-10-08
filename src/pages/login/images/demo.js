function fun(){
    return new Promise((resolve, reject) => {
        reject('fail')
    }) 
}
async function func1(){
    try{
    const response = await fun();
    }catch(err){
        console.log(err);
    }
    
}
func1()