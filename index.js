import { menuArray } from './data.js'

(function() {
let productsAdded = [];

document.addEventListener("click", function(event) {
    const addButtonID = event.target.dataset.add;
   const removeButtonID = event.target.dataset.remove;


   if(addButtonID) {
      handletargetObject(Number(addButtonID))
   
   } 
   
   if(removeButtonID) {
      removeTargetObject(Number(removeButtonID))
   }

   if(event.target.id === "order-btn") {
      openPaymentModal()
      
   }

   if (event.target === document.getElementById("payment-modal")) {
   	closePaymentModal()
   }

})


function handletargetObject(IDtoAdd) {
  
      const targetObject = menuArray.filter((product) => {
      return product.id === IDtoAdd
   })[0]

   productsAdded.push(targetObject);
   calculateTotalCost()
   renderOrders()
}


function removeTargetObject(IDtoRemove) {

   productsAdded = productsAdded.filter((product) => {
   return product.id !== IDtoRemove;
   
})
renderOrders()

}


function calculateTotalCost() {
   if(productsAdded) {
      const totalCost = productsAdded.reduce((total, currentProduct) => {
      return total + currentProduct.price
   },0)
      return totalCost
      }
   }


function openPaymentModal() {

   const paymentModal = document.getElementById("payment-modal")
   paymentModal.showModal();

}

function closePaymentModal() {
   const paymentModalClose = document.getElementById("payment-modal")
   paymentModalClose.close()
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


function renderOrders() {
   const totalPriceEl = document.getElementById("total")
   const productsList = document.getElementById("list");

   if(productsAdded) {

      const orderedProductsHTML = productsAdded.map((product) => {
         return `<li class="item">${product.name} 
         <button class="remove-btn" data-remove="${product.id}">remove</button> 
         <span class="total-price">$${product.price}</span>
         </li>`
      }).join("")

      productsList.innerHTML = orderedProductsHTML;
      totalPriceEl.textContent = `$${calculateTotalCost()}`;
      toggleOrderModal()
   }
}


function toggleOrderModal() {
   const orderModal = document.getElementById("modal");

   if(productsAdded.length > 0) {
   orderModal.classList.remove("modal-hidden")
   } else {
   orderModal.classList.add("modal-hidden")
   }
}

                 
function renderHTML() {
   document.getElementById("menu-box").innerHTML = menuElements();
}
renderHTML(); 

})();