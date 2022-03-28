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