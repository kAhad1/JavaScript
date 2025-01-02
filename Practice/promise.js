
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


// When promise is recieved how to deal with them using then and catch
// const getPromise =()=>{
//     return new Promise((resolve,reject)=>{
//         console.log("I am a promise");
//         reject("error");
//         resolve("success");

//     })

// }
// let promise = getPromise();
// promise.then((res)=>{
//     console.log("Promise DOne",res);

// })
// promise.catch((err)=>{
// console.log("Promise failed",err);
// })

// Promise Chain
// const promiseChain = (dataId)=>{
//     return new Promise((resolve,reject)=>{
//        setTimeout(() => {
//         console.log("Data" , dataId);
//         resolve("Success");
//        }, 3000);
//     })
// }
// console.log("Getting data 1...")

// promiseChain(1)
//     .then(()=>{
//         console.log("getting data 2...");
//         return promiseChain(2);
//     }).then(()=>{
//         console.log("getting data 3...");
//        return promiseChain(3);
//     }).then((res)=>{
//         console.log(res)
//     })
