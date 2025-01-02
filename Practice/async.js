const getData= (dataId)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log("Data",dataId);
         resolve("sucess")
           
       
    },2000)
  })
}

(async ()=>{
    console.log("getting data 1...");
    await getData(1);
    console.log("getting data 2...");
    await getData(2);
    console.log("getting data 3...");
    await getData(3);
    console.log("getting data 4...");
    await getData(4).then((res)=>{
        console.log(res)
    });
    
    
})();

// async function getDataApi(){
//     console.log("getting Data 1...")
//     await getData(1);
//     console.log("getting Data 2...")
//     await getData(2);
//     console.log("getting Data 3...")
//     await getData(3);
//     console.log("getting Data 4...")
//     await getData(4);

// }
