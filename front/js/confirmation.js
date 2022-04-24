/* On recupere le numero de commande, on l'affiche et le supprime */

function main(){
    const idSelect = document.getElementById("orderId");
    idSelect.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"));
    localStorage.removeItem("orderId");
}

main();