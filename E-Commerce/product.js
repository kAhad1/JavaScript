import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBikyi3yyesNE5ZsM1P3uhLg03f4TIPz1Q",
    authDomain: "e-commerce-cffcc.firebaseapp.com",
    projectId: "e-commerce-cffcc",
    storageBucket: "e-commerce-cffcc.firebasestorage.app",
    messagingSenderId: "341756955843",
    appId: "1:341756955843:web:a950743727b5b080f1a676"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to fetch and display products
const fetchProducts = async () => {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return; // Exit if the container doesn't exist

    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        productsContainer.innerHTML = ""; // Clear existing content

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productElement = `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Rs ${product.price}</p>
                    <button class="add-to-cart-btn" data-id="${doc.id}">Add to Cart</button>
                    <button class="favorite-btn" data-id="${doc.id}">Save to Favorites</button>
                </div>
            `;
            productsContainer.insertAdjacentHTML('beforeend', productElement);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = e.target.getAttribute('data-id');
        const user = auth.currentUser;

        if (user) {
            try {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    const cart = userData.cart || []; // Initialize cart if it doesn't exist

                    // Add product to cart
                    if (!cart.includes(productId)) {
                        cart.push(productId);
                        await setDoc(userRef, { cart: cart }, { merge: true });
                        alert("Product added to cart!");
                    } else {
                        alert("Product is already in your cart.");
                    }
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        } else {
            alert("You must be signed in to add products to your cart.");
        }
    }
});

document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('favorite-btn')) {
        const productId = e.target.getAttribute('data-id');
        const user = auth.currentUser;

        if (user) {
            try {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    const favorites = userData.favorites || []; // Initialize favorites if it doesn't exist

                    // Add product to favorites
                    if (!favorites.includes(productId)) {
                        favorites.push(productId);
                        await setDoc(userRef, { favorites: favorites }, { merge: true });
                        alert("Product added to favorites!");
                    } else {
                        alert("Product is already in your favorites.");
                    }
                }
            } catch (error) {
                console.error("Error saving to favorites:", error);
            }
        } else {
            alert("You must be signed in to save products to your favorites.");
        }
    }
});

if (window.location.pathname.includes("products.html")) {
    fetchProducts();
}