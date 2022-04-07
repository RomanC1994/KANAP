const allBasket = localStorage.getItem("allBasket");
const allBasketJson = JSON.parse(allBasket);
console.log(allBasketJson);

/* On appelle l'API */
fetch("http://localhost:3000/api/products")

  .then(function(productsArray) {
    if (productsArray.ok) {
      return productsArray.json();
    }
  })

  .then(function(value) {
    console.log("API successfully loaded");

    for (let items of allBasketJson) {
        let item = JSON.parse(items);
        let itemNum = item.num;
        let itemCouleur = item.couleur;
        let itemQuantité = item.quantité;
        console.log(itemNum + itemCouleur + itemQuantité);
    
        article = document.createElement("article");
        document.getElementById("cart__items").appendChild(article);
        article.setAttribute("class", "cart__item");
        article.setAttribute("id", "cart__item");
        article.setAttribute("data-id", itemNum);
        article.setAttribute("data-color", itemCouleur);
    
        divImg = document.createElement("div");
        article.appendChild(divImg);
        divImg.setAttribute("class", "cart__item__img");
        divImg.setAttribute("id", "cart__item__img");
    
        img = document.createElement("img");
        divImg.appendChild(img);
        img.setAttribute("src", value[itemNum].imageUrl);
        img.setAttribute("alt", value[itemNum].name);

        divContent = document.createElement("div");
        article.appendChild(divContent);
        divContent.setAttribute("class", "cart__item__content");
        divContent.setAttribute("id", "cart__item__content");

        divcontent__description = document.createElement("div");
        divContent.appendChild(divcontent__description);
        divcontent__description.setAttribute("class", "cart__item__content__description");
        divcontent__description.setAttribute("id", "cart__item__content__description");

        h2 = document.createElement("h2");
        divcontent__description.appendChild(h2);
        h2.innerText = value[itemNum].name;

        p_color = document.createElement("p");
        divcontent__description.appendChild(p_color);
        p_color.innerText = itemCouleur;

        p_price = document.createElement("p");
        divcontent__description.appendChild(p_price);
        p_price.innerText = value[itemNum].price + " €";

        divcontent__settings = document.createElement("div");
        divContent.appendChild(divcontent__settings);
        divcontent__settings.setAttribute("class", "cart__item__content__settings");
        divcontent__settings.setAttribute("id", "cart__item__content__settings");

        divcontent__settings__quantity = document.createElement("div");
        divcontent__settings.appendChild(divcontent__settings__quantity);
        divcontent__settings__quantity.setAttribute("class", "cart__item__content__settings__quantity");
        divcontent__settings__quantity.setAttribute("id", "cart__item__content__settings__quantity");

        p_quantité = document.createElement("p");
        divcontent__settings__quantity.appendChild(p_quantité);
        p_quantité.innerText = "quantité : ";

        input_quantity = document.createElement("input");
        divcontent__settings__quantity.appendChild(input_quantity);
        input_quantity.setAttribute("type", "number");
        input_quantity.setAttribute("class", "itemQuantity");
        input_quantity.setAttribute("name", "itemQuantity");
        input_quantity.setAttribute("min", "1");
        input_quantity.setAttribute("max", "100");
        input_quantity.setAttribute("value", itemQuantité);

        divcontent__settings__delete = document.createElement("div");
        divcontent__settings__quantity.appendChild(divcontent__settings__delete);
        divcontent__settings__delete.setAttribute("class", "cart__item__content__settings__delete");
        divcontent__settings__delete.setAttribute("id", "cart__item__content__settings__delete");

        p_delete = document.createElement("p");
        divcontent__settings__delete.appendChild(p_delete);
        p_delete.setAttribute("class", "deleteItem");
        p_delete.innerText = "Supprimer";
    }
  })

  .catch(function(err) {
    console.log("failed to load the API");
  });  

