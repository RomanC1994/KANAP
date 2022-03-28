let a = '';
let article = '';
let h3 = '';
let p = '';
let img = '';


/* On appelle l'API */
fetch("http://localhost:3000/api/products")

  .then(function(productsArray) {
    if (productsArray.ok) {
      return productsArray.json();
    }
  })

  .then(function(value) {
    console.log("API successfully loaded");
    for (i in value){

      /* La fonction suivante crée une fiche produit*/
      function productInit(i) {
        a = document.getElementById("items").appendChild(document.createElement("a"));
        a.setAttribute("href", "./product.html?id=" + i + "");
        a.setAttribute("id", "a_link");
        article = document.createElement("article");
        a.appendChild(article);
        img = document.createElement("img");
        article.appendChild(img);
        img.setAttribute("src", value[i].imageUrl);
        img.setAttribute("alt", value[i].name);
        h3 = document.createElement("h3");
        article.appendChild(h3);
        h3.setAttribute("id", "productName");
        h3.innerText = value[i].name;
        p = document.createElement("p");
        article.appendChild(p);
        p.setAttribute("id", "productDescription");
        p.innerText = value[i].description;
      }
      productInit(i);
    }

  })

  .catch(function(err) {
    console.log("failed to load the API");
  });  


/*

const products = '';
let productName = "";
let productDescription = "";
let productImg = "";

   for (i in value){
      productName = document.getElementsByClassName("productName");
      productDescription = document.getElementsByClassName("productDescription");
      productImg = document.getElementsByClassName("productName").previousElementSibling;
      productName.innerText = value[i].name;
      productDescription.innerText = value[i].description;
      productImg.setAttribute("src", value[i].imageUrl);
    }


let b = document.getElementsByClassName("items").appendChild(document.createElement("a"));

b.setAttribute("class", "lol");
document.getElementsByClassName("lol").appendChild(document.createElement("article"));
  
*/