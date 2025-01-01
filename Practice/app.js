const getData = (dataId,getNextData) =>{
    setTimeout(()=>{
        console.log("Data",dataId);
        if(getNextData){
            getNextData();
        }

    },2000)
}
getData(1,()=>{
    getData(2,()=>{
        getData(3,()=>{
            getData(4)
        })
    })
})


