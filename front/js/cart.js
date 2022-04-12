const allBasket = localStorage.getItem("allBasket");
const allBasketJson = JSON.parse(allBasket);
let totalPrice = '0';

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
        resultPrice = parseInt(totalPrice) + parseInt(value[itemNum].price);
        totalPrice = parseInt(resultPrice);

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
        p_quantité.innerText = "Qté : ";

        input_quantity = document.createElement("input");
        divcontent__settings__quantity.appendChild(input_quantity);
        input_quantity.setAttribute("type", "number");
        input_quantity.setAttribute("class", "itemQuantity");
        input_quantity.setAttribute("name", "itemQuantity");
        input_quantity.setAttribute("min", "1");
        input_quantity.setAttribute("max", "100");
        input_quantity.setAttribute("value", itemQuantité);
        input_quantity.addEventListener("focusout", function() {
          changeQuantity();
        });

        divcontent__settings__delete = document.createElement("div");
        divcontent__settings.appendChild(divcontent__settings__delete);
        divcontent__settings__delete.setAttribute("class", "cart__item__content__settings__delete");
        divcontent__settings__delete.setAttribute("id", "cart__item__content__settings__delete");

        p_delete = document.createElement("p");
        divcontent__settings__delete.appendChild(p_delete);
        p_delete.setAttribute("class", "deleteItem");
        p_delete.setAttribute("id", "deleteItem");
        p_delete.innerText = "Supprimer";
        p_delete.addEventListener("click", function() {
          suppr();
        })
     
        /* Supprime l'article sur lequel on click 'suppr' */
        function suppr() {

          console.log(itemNum);
      
          let deletedItem = document.querySelector("[data-id=" + CSS.escape(itemNum) + "][data-color=" + CSS.escape(itemCouleur) + "]");

          let deletedId = deletedItem.dataset.id;
          let deletedColor = deletedItem.dataset.color;
          console.log(deletedId + deletedColor);

          /* localStorage.deleteItem("allBasket"); /*Ne pas supprimer tout le Panier mais juste l'item selectionné */

          document.getElementById("cart__items").removeChild(deletedItem);
        };

        /* Recupere la quantité ajoutée par l'user pour la renvoyer au local storage*/
        function changeQuantity() {
          let quantityParent = document.querySelector("[data-id=" + CSS.escape(itemNum) + "][data-color=" + CSS.escape(itemCouleur) + "]");
          let choosenQuantity = quantityParent.querySelector("input");
          console.log(choosenQuantity.value);
          
          item.quantité = choosenQuantity.value;
          /* Trouver comment envoyer la nouvelle quantité dans le localStorage */
          localStorage.setItem("allBasket", JSON.stringify(allBasketJson));
        };
    }
    
    let allItems = allBasketJson.length;
    let basketCount = document.getElementById("totalQuantity");
    basketCount.innerText = allItems;

    let totalPrix = document.getElementById("totalPrice");
    totalPrix.innerText = totalPrice;

  })
  .catch(function(err) {
    console.log("failed to load the API");
  });  

  /* Form */

  let truePrenom = "";
  let trueNom = "";
  let trueAddress = "";
  let trueCity = "";
  let trueEmail = "";

  let prenom = document.getElementById("firstName");
  prenom.addEventListener("input", function(inputText) {
    console.log(inputText.target.value);
    if (/^\D\S*$/.test(inputText.target.value)) {
      document.getElementById("firstNameErrorMsg").innerHTML = "Le prenom inseré est valide";
      truePrenom = "true";
    }
    else {
      trueEmail = "false";
      document.getElementById("firstNameErrorMsg").innerHTML = "Le prenom inseré n'est pas valide";
    };
  });

  let nom = document.getElementById("lastName");
  nom.addEventListener("input", function(inputText) {
    console.log(inputText.target.value);
    if (/^\D\S*$/.test(inputText.target.value)) {
      document.getElementById("lastNameErrorMsg").innerHTML = "Le nom inseré est valide";
      trueNom = "true";
    }
    else {
      trueEmail = "false";
      document.getElementById("lastNameErrorMsg").innerHTML = "Le nom inseré n'est pas valide";
    };
  });

  let address = document.getElementById("address");
  address.addEventListener("input", function(inputText) {
    console.log(inputText.target.value);
    if (/^\w/.test(inputText.target.value)) {
      document.getElementById("addressErrorMsg").innerHTML = "L'adresse inserée est valide";
      trueAddress = "true";
    }
    else {
      trueEmail = "false";
      document.getElementById("addressErrorMsg").innerHTML = "L'adresse inserée n'est pas valide";
    };
  });

  let city = document.getElementById("city");
  city.addEventListener("input", function(inputText) {
    console.log(inputText.target.value);
    if (/^\D\S*$/.test(inputText.target.value)) {
      document.getElementById("cityErrorMsg").innerHTML = "La ville inserée est valide";
      trueCity = "true";
    }
    else {
      trueEmail = "false";
      document.getElementById("cityErrorMsg").innerHTML = "La ville inserée n'est pas valide";
    };
  });

  let email = document.getElementById("email");
  email.addEventListener("input", function(inputText) {
    console.log(inputText.target.value);
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputText.target.value)) {
      document.getElementById("emailErrorMsg").innerHTML = "Le mail inseré est valide";
      trueEmail = "true";
    }
    else {
      trueEmail = "false";
      document.getElementById("emailErrorMsg").innerHTML = "Le mail inseré n'est pas valide";
    };
  });

  document.querySelector(".cart__order__form__submit").addEventListener("click", function(u) {
    u.preventDefault();
    if (truePrenom === "true" && trueNom === "true" && trueAddress === "true" && trueCity === "true" && trueEmail === "true") {
      console.log("FORMULAIRE ENVOYé");
      /* dans ce cas poster */
    }
  });

  

