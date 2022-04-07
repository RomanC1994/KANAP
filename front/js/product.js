let vraifo = '';
const completeUrl = location;
var url = new URL(completeUrl);
var search_params = new URLSearchParams(url.search); 
if(search_params.has('id')) {
  var id = search_params.get('id');
  console.log("Id reached");
  console.log("Id is " + id);
}
else {
  console.log("unable to reach the product id in URL");
};

fetch("http://localhost:3000/api/products")

  .then(function(productsArray) {
    if (productsArray.ok) {
      return productsArray.json();
    }
  })

  .then(function(value) {
    console.log("API successfully loaded");
    console.log(value[id]);
    
     /* La fonction suivante crée une fiche produit*/
    function reachProduct(id){
      img = document.createElement("img");
      document.getElementById("item__content").appendChild(img);
      img.setAttribute("src", value[id].imageUrl);
      img.setAttribute("alt", value[id].name);
      title = document.getElementById("title");
      title.innerText = value[id].name;
      price = document.getElementById("price");
      price.innerText = value[id].price;
      description = document.getElementById("description");
      description.innerText = value[id].description;

      for (i in value[id].colors) {
        console.log(value[id].colors[i]);
        color = document.createElement("option");
        document.getElementById("colors").add(color);
        color.setAttribute("value", value[id].colors[i]);
        color.innerText = value[id].colors[i];
      }
    }
    reachProduct(id);
    
    /* Cette fonction recupere le produit pour l'ajouter au panier */
    function storeChoice(id) {
      
      let existingBasket = JSON.parse(localStorage.getItem("allBasket"));
      
      if(existingBasket == null) {
        existingBasket = [];
      }

      const colo = document.getElementById("colors").value;
      const quant = document.getElementById("quantity").value;

      let itemChoosenJson = {
        num: id,
        couleur: colo,
        quantité: quant
      };

      const itemChoosen = JSON.stringify(itemChoosenJson);
      localStorage.setItem("lastBuy", itemChoosen);

      for (let objs of existingBasket) {
        let obj = JSON.parse(objs);
        
        if(obj.couleur == itemChoosenJson.couleur && obj.num == itemChoosenJson.num) {

          vraifo = true;
          let newQuant = JSON.parse(obj.quantité) + JSON.parse(itemChoosenJson.quantité);
          console.log(newQuant);
          alert("vous avez ajouté " + itemChoosenJson.quantité + "canapé(s) supplementaire de l'id : " + itemChoosenJson.num);
          /* Il faut ici envoyer la nouvelle valeur contenu dans obj.quantité au localStorage dans le "existingBasket" dans l'objet canapé correespondant (obj.num = itemNum ?) et remplacer obj.Quantité */
         /* PLUS OU MOINS CA existingBasket[obj].quantité = newQuant;*/
          localStorage.setItem("allBasket", JSON.stringify(existingBasket));
        }
      }
      console.log(vraifo);
      if (vraifo !== true) {
        existingBasket.push(itemChoosen);
        alert("bonjour vous avez ajouté ceci: canapé numero " + itemChoosenJson.num + " en " + itemChoosenJson.couleur + " et vous en voulez " + itemChoosenJson.quantité);
        localStorage.setItem("allBasket", JSON.stringify(existingBasket));
      }

    }

    /*On appelle la fonction quand button est click*/
    document.getElementById("addToCart").addEventListener("click", function() {
      storeChoice(id);
    })
    
  })

  .catch(function(err) {
    console.log("failed to load the API");
  });  


  /*
 
  color = document.createElement("option");
      document.getElementById("colors").add(color);
      color.setAttribute("value", value[id].colors);
      color.innerText = value[id].colors;


  */