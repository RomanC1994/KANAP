function main(){
    const idSelect = document.getElementById("orderId");
    idSelect.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"));
}

main();