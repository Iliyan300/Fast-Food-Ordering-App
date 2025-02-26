import { menuArray } from './data.js'

const orderModal = document.getElementById("modal");
const productsList = document.getElementById("list");
const menuContainer = document.getElementById("menu-box");
const productsAdded = [];


menuContainer.addEventListener("click", function(event) {

   const addButtonID = event.target.dataset.add;
   if(addButtonID) {
      handletargetObject(Number(addButtonID))
   }

})


function handletargetObject(buttonID) {
  
   const targetObject = menuArray.filter((product) => {
      return product.id === buttonID
   })[0]

   productsAdded.push(targetObject);
   renderOrders()
}



function menuElements() {

   const products = menuArray.map(function(product) {

    return `<div class="product-container" id="prod">
                <div><img src="images/${product.image}"></div>
                <div class="product-title">
                <h2 class="product">${product.name}</h2>
                <p class="ingredients">${product.ingredients}</p>
                <p class="price">$${product.price}</p>
            </div>
            <div class="add-btn">
               <i class="fa-solid fa-square-plus" data-add="${product.id}"></i>
            </div>
            </div>
            `

   }).join("")

   return products
}


function renderHTML() {

 menuContainer.innerHTML = menuElements();

            
}

renderHTML();


function renderOrders() {

   if(productsAdded) {

      const orderedProductsHTML = productsAdded.map((product) => {
         return `<li class="item">${product.name} <button class="remove-btn" data-remove="${product.id}">remove</button> <span class="total-price">$${product.price}</span>
         
         </li>`
      }).join("")

      productsList.innerHTML = orderedProductsHTML;
      showModal()
   }
   
}


function showModal() {
   orderModal.classList.remove("modal-hidden")
}

                 
             