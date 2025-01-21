console.log("cart.js");
var urlParams = new URLSearchParams(window.location.search);
var productId = urlParams.get('productId');

document.addEventListener('DOMContentLoaded', function() {
  myCartMethod();
});

function myCartMethod() {
  console.log("myCartMethod");
  let html = `<div class="img-section">
    <img src="%mainImage%" alt="" id="MainImg">
    <div class="small-images">
      <img src="%small1%" alt="" onclick="changeImage(this)">
      <img src="%small2%" alt="" onclick="changeImage(this)">
      <img src="%small3%" alt="" onclick="changeImage(this)">
      <img src="%small4%" alt="" onclick="changeImage(this)">
    </div>
  </div>
  <div class="description">
    <h6>%brand%</h6>
    <h5>%title%</h5>
    <div class="price">
      <h3 class="old-price">$%price%.00</h3>
      <h3>$%newPrice%</h3>
    </div>
    <div class="select-group">
      <select>
        <option>Select Size</option>
        <option>XL</option>
        <option>XXL</option>
        <option>Small</option>
        <option>Large</option>
      </select>
      <input type="number" value="1" min="1">
    </div>
    <button onclick="addToCart(%pd%)">Add To Cart</button>
    <h2>Product Details</h2>
    <div class="rating">
      <span>Rating: %rating% </span>
    </div>
    <span>%des%</span>
  </div>`;

  fetch('https://dummyjson.com/products/' + productId)
    .then(res => res.json())
    .then(data => {
      let newHTML = html
        .replace('%mainImage%', data.images[0])
        .replace('%brand%', data.brand)
        .replace('%rating%', data.rating)
        .replace('%newPrice%', data.price - (data.price * data.discountPercentage / 100))
        .replace('%small1%', data.images[1])
        .replace('%small2%', data.images[2])
        .replace('%small3%', data.images[3])
        .replace('%small4%', data.images[4])
        .replace('%title%', data.title)
        .replace('%price%', data.price)
        .replace('%des%', data.description)
        .replace('%pd%', data.id);
      
      document.getElementById('prodetails').insertAdjacentHTML('beforeend', newHTML);
    });

  // Perform any necessary actions or function calls for the cart page
}

var cartVisible = false;
var cartItems = [];

// Check if there are any cart items stored in localStorage
var storedCartItems = localStorage.getItem("cartItems");
if (storedCartItems) {
  try {
    cartItems = JSON.parse(storedCartItems);
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
  } catch (error) {
    cartItems = [];
  }
  updateCart();
}

async function changeImage(param) {
  document.querySelector('#MainImg').src = param.src;
}

function toggleCart() {
  var cart = document.getElementById("cart");
  cart.classList.toggle("cart-visible");
  cart.classList.toggle("cart-hidden");
  cartVisible = !cartVisible;
}

function clearCart() {
  cartItems = [];
  updateCart();
  saveCartItems();
  document.getElementById("cart-total").innerHTML = "Cart is Empty!";
}

function addToCart(data) {
  if (!cartItems.includes(data)) {
    cartItems.push(data);
    showAlert("Added to cart successfully!");
    updateCart();
    saveCartItems();
  } else {
    showAlert("Item already in cart.");
  }
}

function updateCart() {
  var cartItemsList = document.getElementById("cart-items");
  cartItemsList.innerHTML = "";
  var total = 0;
  
  cartItems.forEach((itemId, index) => {
    fetch('https://dummyjson.com/products/' + itemId)
      .then(res => res.json())
      .then(data => {
        var listItem = document.createElement("li");
        listItem.classList.add("cart-item");

        var productImage = document.createElement("img");
        productImage.src = data.images[0];
        productImage.alt = data.title;
        listItem.appendChild(productImage);

        var detailsContainer = document.createElement("div");
        detailsContainer.classList.add("cart-item-details");

        var productName = document.createElement("h4");
        productName.textContent = data.title;
        detailsContainer.appendChild(productName);

        var productPrice = document.createElement("span");
        productPrice.textContent = "$" + data.price + ".00";
        detailsContainer.appendChild(productPrice);

        total += data.price;

        var removeButton = document.createElement("button");
        removeButton.innerHTML = "Remove";
        removeButton.addEventListener("click", function () {
          removeFromCart(index);
        });

        detailsContainer.appendChild(removeButton);
        listItem.appendChild(detailsContainer);
        cartItemsList.appendChild(listItem);

        document.getElementById("cart-total").innerHTML = "Total: $" + total + ".00";
      });
  });

  if (cartItems.length === 0) {
    document.getElementById("cart-total").innerHTML = "Cart is Empty!";
  }
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCart();
  saveCartItems();
}

function saveCartItems() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

var alertQueue = [];

function showAlert(message) {
  alertQueue.push(message);

  if (!document.getElementById("alert").classList.contains("show")) {
    displayNextAlert();
  }
}

function displayNextAlert() {
  var alertElement = document.getElementById("alert");
  var alertMessage = document.getElementById("alert-message");

  if (alertQueue.length > 0) {
    var message = alertQueue.shift();
    alertMessage.textContent = message;
    alertElement.classList.add("show");

    setTimeout(function () {
      alertElement.classList.remove("show");
      alertElement.classList.add("hide");

      setTimeout(function () {
        alertElement.classList.remove("hide");
        displayNextAlert();
      }, 300);
    }, 3000);
  }
}

// Search bar functionality
const searchArea = document.getElementById("search-area");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const searchResults = document.querySelector(".search-results");

searchButton.addEventListener("click", function () {
  const query = searchInput.value.trim();
  searchProducts(query);
});

function searchProducts(query) {
  let flag = false;

  fetch("https://dummyjson.com/products/search?q=" + query)
    .then(response => response.json())
    .then(data => {
      searchResults.innerHTML = ""; // Clear previous search results

      if (isObjectWithData(data)) {
        searchArea.style.height = "100vh";
        
        data.products.forEach(product => {
          let html = `<div class="product" onclick="redirectToProductDetails(${product.id})">
            <img src="${product.images[0]}" alt="Product">
            <div class="product-info">
              <h3>${product.category}</h3>
              <h2>${product.title}</h2>
              <p>${product.description}</p>
              <div class="product-price">
                <span class="discount-percentage">${product.discountPercentage}% OFF</span>
                <span class="price-old">$${product.price}</span>
                <span class="price-new">$${product.price - (product.price * product.discountPercentage / 100)}</span>
              </div>
              <button class="add-to-cart">Add to Cart</button>
            </div>
          </div>`;
          searchResults.insertAdjacentHTML('beforeend', html);
          flag = true;
        });
      }

      if (!flag) {
        searchResults.insertAdjacentHTML('beforeend', "<p>No results found.</p>");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      searchResults.innerHTML = "<p>An error occurred while fetching the search results.</p>";
    });
}

function isObjectWithData(obj) {
  return typeof obj === "object" && obj !== null && Object.keys(obj).length > 0;
}
