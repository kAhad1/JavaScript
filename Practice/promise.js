
// Basic Promise
// let promise= new Promise((accept,notAccept)=>{
//     console.log("I am a Promise");
//     notAccept("asd")
// })


// How to accept and reject Promise
// const getData = (dataId, getNextData)=>{
//     return new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         console.log("Data" , dataId);
//         reject("reject");
//         if(getNextData){
//             getNextData();
//         }
//     }, 5000)});
// }
// let abc=getData(2,()=>{
//     getData(3);
// })


const getPromise =()=>{
    return new Promise((resolve,reject)=>{
        console.log("I am a promise");
        reject("error");
        resolve("success");

    })

}
let promise = getPromise();
promise.then((res)=>{
    console.log("Promise DOne",res);

})
promise.catch((err)=>{
console.log("Promise failed",err);
})
