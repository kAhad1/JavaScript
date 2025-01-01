

// let promise= new Promise((accept,notAccept)=>{
//     console.log("I am a Promise");
//     notAccept("asd")
// })

const getData = (dataId, getNextData)=>{
    return new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log("Data" , dataId);
        reject("reject");
        if(getNextData){
            getNextData();
        }
    }, 5000)});
}

let abc=getData(2,()=>{
    getData(3);
})