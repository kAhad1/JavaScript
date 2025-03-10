import { app, db, auth } from "./app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBikyi3yyesNE5ZsM1P3uhLg03f4TIPz1Q",
    authDomain: "e-commerce-cffcc.firebaseapp.com",
    projectId: "e-commerce-cffcc",
    storageBucket: "e-commerce-cffcc.firebasestorage.app",
    messagingSenderId: "341756955843",
    appId: "1:341756955843:web:a950743727b5b080f1a676"
};

// Function to fetch and display cart items
const fetchCartItems = async (user) => {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return; // Exit if the container doesn't exist

    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const cart = userData.cart || [];

            if (cart.length === 0) {
                cartContainer.innerHTML = "<p>Your cart is empty.</p>";
                return;
            }

            // Count the quantity of each product in the cart
            const productQuantities = {};
            for (const productId of cart) {
                productQuantities[productId] = (productQuantities[productId] || 0) + 1;
            }

            // Fetch product details for each item in the cart
            cartContainer.innerHTML = ""; // Clear existing content
            let totalAmount = 0;

            for (const productId in productQuantities) {
                const productRef = doc(db, "products", productId);
                const productSnap = await getDoc(productRef);

                if (productSnap.exists()) {
                    const product = productSnap.data();
                    const quantity = productQuantities[productId];
                    const itemTotal = product.price * quantity;
                    totalAmount += itemTotal;

                    const cartItemElement = `
                        <div class="cart-item">
                            <img src="${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p>Rs ${product.price} x ${quantity} = Rs ${itemTotal}</p>
                            <button class="decrease-quantity-btn" data-id="${productId}">-</button>
                            <span>${quantity}</span>
                            <button class="increase-quantity-btn" data-id="${productId}">+</button>
                            <button class="remove-from-cart-btn" data-id="${productId}">Remove</button>
                        </div>
                    `;
                    cartContainer.insertAdjacentHTML('beforeend', cartItemElement);
                }
            }

            // Display total amount
            const totalElement = `
                <div class="cart-total">
                    <h3>Total Amount: Rs ${totalAmount}</h3>
                </div>
            `;
            cartContainer.insertAdjacentHTML('beforeend', totalElement);
        }
    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
};

// Function to remove a product from the cart
const removeFromCart = async (user, productId) => {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const cart = userData.cart || [];

            // Remove all instances of the product from the cart
            const updatedCart = cart.filter(id => id !== productId);

            // Update the cart in Firestore
            await updateDoc(userRef, { cart: updatedCart });
            fetchCartItems(user); // Refresh the cart display
        }
    } catch (error) {
        console.error("Error removing product from cart:", error);
    }
};

// Function to increase the quantity of a product in the cart
const increaseQuantity = async (user, productId) => {
    
    try {
        
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            
            const userData = userSnap.data();
            const cart = userData.cart || [];

            // Add the product to the cart to increase its quantity
            cart.push(productId);

            // Update the cart in Firestore
            await updateDoc(userRef, { cart: cart });
            fetchCartItems(user); // Refresh the cart display
        }
    } catch (error) {
        console.error("Error increasing product quantity:", error);
    }
};

// Function to decrease the quantity of a product in the cart
const decreaseQuantity = async (user, productId) => {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const cart = userData.cart || [];

            // Find the index of the product in the cart
            const index = cart.indexOf(productId);
            if (index !== -1) {
                // Remove one instance of the product from the cart
                cart.splice(index, 1);

                // Update the cart in Firestore
                await updateDoc(userRef, { cart: cart });
                fetchCartItems(user); // Refresh the cart display
            }
        }
    } catch (error) {
        console.error("Error decreasing product quantity:", error);
    }
};

// Event listeners for quantity and remove buttons
document.addEventListener('click', async (e) => {
    const user = auth.currentUser;
    if (!user) return;

    if (e.target.classList.contains('remove-from-cart-btn')) {
        const productId = e.target.getAttribute('data-id');
        await removeFromCart(user, productId);
    }

    if (e.target.classList.contains('increase-quantity-btn')) {
        const productId = e.target.getAttribute('data-id');
        await increaseQuantity(user, productId);
    }

    if (e.target.classList.contains('decrease-quantity-btn')) {
        const productId = e.target.getAttribute('data-id');
        await decreaseQuantity(user, productId);
    }
});

// Use onAuthStateChanged to ensure the user is signed in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, fetch cart items
        fetchCartItems(user);
    } else {
        // User is not signed in, redirect to login page
        alert("You must be signed in to view your cart.");
        window.location.href = "index.html";
    }
});