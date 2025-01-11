let URL = "https://api.thedogapi.com/v1/images/search?limit=10";
const btn=document.getElementById("btn");
const getImages=document.getElementById("images");
let getFacts = async()=>{
    console.log("getting data...");
    let promise= await fetch(URL);
    console.log(promise);
    let data = await promise.json();
    getImages.innerHTML = `<a href="${data[9].url}"> Image </a>`; 
    data.reques
}

btn.addEventListener('click',getFacts);
