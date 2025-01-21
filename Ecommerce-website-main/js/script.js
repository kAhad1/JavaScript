
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname === '/buttonSlider') {
    console.log("widnow button slider");
  }
});

let products1 = [];

// Function to display the loading message
function showLoading() {
  document.getElementById('loading').style.display = 'block';
}

// Function to hide the loading message
function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

// Function to display the product data
function showProductData() {
  const contentElement = document.getElementById('content');
  contentElement.innerHTML = '';
  var found = false;
  
  if (Array.isArray(products1)) {
    products1.forEach(function (product) {
      if (1) {
        var html = `<div class="product" data-aos="zoom-out" data-aos-duration="2000">
          <img src="%src%" alt="Product 1" onclick="redirectToProductDetails(%productId%)">
          <div class="product-info">
            <h3 class="product-brand" onclick="redirectToProductDetails(%productId1%)">%category%</h3>
            <h2 class="product-name" onclick="redirectToProductDetails(%productId2%)">%title%</h2>
            <p class="product-description" onclick="redirectToProductDetails(%productId3%)">%description%</p>
            <div class="product-price" onclick="redirectToProductDetails(%productId4%)">
              <span class="discount-percentage">%discount%% OFF</span>
              <span class="price-old">$%price%</span>
              <span class="price-new">$%newPrice%</span>
            </div>
            <button class="add-to-cart"  onclick="addToCart(%data.id%)">Add to Cart</button>
          </div>
        </div>`;
        
        newHtml = html.replace('%src%', product.image);
        newHtml = newHtml.replace('%data.id%', product.id);
        newHtml = newHtml.replace('%productId%', product.id);
        newHtml = newHtml.replace('%productId1%', product.id);
        newHtml = newHtml.replace('%productId2%', product.id);
        newHtml = newHtml.replace('%productId3%', product.id);
        newHtml = newHtml.replace('%productId4%', product.id);
        newHtml =  newHtml.replace('%category%',product.category);
        newHtml = newHtml.replace('%brand%', product.brand);
        newHtml = newHtml.replace('%title%',product.title);
        newHtml = newHtml.replace('%price%', product.price);
        newHtml = newHtml.replace('%discount%', product.discount);
        newHtml = newHtml.replace('%product%', product.id);
        newHtml = newHtml.replace('%newPrice%', product.price - (product.price * product.discount / 100));
        newHtml = newHtml.replace('%description%', product.description);
        contentElement.insertAdjacentHTML('beforeend', newHtml);
        found = true;
      }
    });
  } else {
    showError('Invalid data format');
  }

  if (!found) {
    let newHtml = '<h1>Data not found!!</h1>';
    contentElement.insertAdjacentHTML('beforeend', newHtml);
  }
}

// Function to display the error message
function showError(message) {
  const errorElement = document.getElementById('error');
  errorElement.innerHTML = message;
}

// Fetch data from the API
function fetchData() {
  showLoading();
  let products = [];
  let data = localStorage.getItem("productData");

  fetch('https://dummyjson.com/products/category/'+data)
    .then(res => res.json())
    .then(data => {
      products1 = data.products.map(product => {
        return {category: product.category, discount: product.discountPercentage, image: product.images[0], price: product.price, id: product.id, title: product.title, description: product.description}
      });
    })
    .then(function() {
      hideLoading();
      showProductData();
    })
    .catch(function(error) {
      hideLoading();
      showError(error.message);
    });
}

// Load the data when the page is ready
document.addEventListener('DOMContentLoaded', function() {
  fetchData();
});

function getValue(val) {
  localStorage["key"] = 4;
  localStorage.setItem("productData", val);
}

function redirectToProductDetails(productId) {
  var url = 'cart.html?productId=' + encodeURIComponent(productId);
  window.location.href = url;
}

var cartVisible = false;
var cartItems = [];

// Load stored cart items from localStorage
var storedCartItems = localStorage.getItem("cartItems");
if (storedCartItems) {
  try {
    cartItems = JSON.parse(storedCartItems) || [];
  } catch (error) {
    cartItems = [];
  }
  updateCart();
}

// Toggle cart visibility
function toggleCart() {
  var cart = document.getElementById("cart");
  cart.classList.toggle("cart-visible");
  cart.classList.toggle("cart-hidden");
  cartVisible = !cartVisible;
}

// Clear the cart
function clearCart() {
  cartItems = [];
  updateCart();
  saveCartItems();
}

// Add an item to the cart
function addToCart(productId) {
  cartItems.push(productId);
  updateCart();
  saveCartItems();
  alert("Product saved in cart")
}

// Update the cart display
function updateCart() {
  var cartItemsList = document.getElementById("cart-items");
  cartItemsList.innerHTML = "";
  var total = 0;

  if (cartItems.length === 0) {
    cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
    document.getElementById("cart-total").textContent = "Total: $0";
    return;
  }

  cartItems.forEach((productId) => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
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
        productPrice.textContent = "$" + data.price;
        detailsContainer.appendChild(productPrice);

        total += data.price;

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
          removeFromCart(productId);
        });
        detailsContainer.appendChild(removeButton);

        listItem.appendChild(detailsContainer);
        cartItemsList.appendChild(listItem);

        document.getElementById("cart-total").textContent = "Total: $" + total;
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  });
}

// Remove an item from the cart
function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item !== productId);
  updateCart();
  saveCartItems();
}

// Save cart items to localStorage
function saveCartItems() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

/* Searchbar */

const searchArea = document.getElementById("search-area");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const searchResults = document.querySelector(".search-results");

searchButton.addEventListener("click", function() {
  const query = searchInput.value.trim();
  searchProducts(query);
});

function searchProducts(query) {
  fetch("https://dummyjson.com/products/search?q=" + query)
    .then(response => response.json())
    .then(data => {
      searchResults.innerHTML = ""; 

      if (data.products && data.products.length > 0) {
        searchArea.style.height = "100vh";

        data.products.forEach(product => {
          var html = `<div class="product">
            <img src="%src%" alt="Product 1" onclick="redirectToProductDetails(%productId%)">
            <div class="product-info">
              <h3 class="product-brand" onclick="redirectToProductDetails(%productId1%)">%category%</h3>
              <h2 class="product-name" onclick="redirectToProductDetails(%productId2%)">%title%</h2>
              <p class="product-description" onclick="redirectToProductDetails(%productId3%)">%description%</p>
              <div class="product-price" onclick="redirectToProductDetails(%productId4%)">
                <span class="discount-percentage">%discount%% OFF</span>
                <span class="price-old">$%price%</span>
                <span class="price-new">$%newPrice%</span>
              </div>
              <button class="add-to-cart" onclick="addToCart(%productId%)">Add to Cart</button>
            </div>
          </div>`;

          newHtml = html.replace('%src%', product.images[0]);
          newHtml = newHtml.replace('%productId%', product.id);
          newHtml = newHtml.replace('%productId1%', product.id);
          newHtml = newHtml.replace('%productId2%', product.id);
          newHtml = newHtml.replace('%productId3%', product.id);
          newHtml = newHtml.replace('%productId4%', product.id);
          newHtml = newHtml.replace('%category%', product.category);
          newHtml = newHtml.replace('%title%', product.title);
          newHtml = newHtml.replace('%price%', product.price);
          newHtml = newHtml.replace('%discount%', product.discountPercentage);
          newHtml = newHtml.replace('%newPrice%', product.price - (product.price * product.discountPercentage / 100));
          newHtml = newHtml.replace('%description%', product.description);
          searchResults.insertAdjacentHTML('beforeend', newHtml);
        });
      } else {
        searchResults.insertAdjacentHTML("beforeend", "<p>No results found.</p>");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      searchResults.innerHTML = "<p>An error occurred while fetching the search results.</p>";
    });
}
function showSearchBar() {
  document.getElementById('search-area').style.display = 'block';
}

function hideSearchBar() {
  document.getElementById('search-area').style.display = 'none';
}

function searchProducts() {
  const input = document.getElementById('search-input').value.toLowerCase();
  const resultsContainer = document.getElementById('search-results');

  // Example of filtering products
  const products = ['Product 1', 'Product 2', 'Product 3', 'Product 4']; // This should be your product list
  const filteredProducts = products.filter(product => product.toLowerCase().includes(input));

  resultsContainer.innerHTML = filteredProducts.map(product => `<p>${product}</p>`).join('');
}




