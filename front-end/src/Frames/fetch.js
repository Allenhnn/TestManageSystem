document.addEventListener("DOMContentLoaded",()=>{
    const URL = "";
    fetch(URL)
    .then((response)=>{console.log(response)})
    .catch((err)=>{console.error(err)});
})