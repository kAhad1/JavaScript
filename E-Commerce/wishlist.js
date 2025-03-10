import { app, db, auth } from "./app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Function to fetch and display wishlist items
const fetchWishlistItems = async (user) => {
    const wishlistContainer = document.getElementById('wishlist-container');
    if (!wishlistContainer) return; // Exit if the container doesn't exist

    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const favorites = userData.favorites || [];

            if (favorites.length === 0) {
                wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
                return;
            }

            // Fetch product details for each item in the wishlist
            wishlistContainer.innerHTML = ""; // Clear existing content

            for (const productId of favorites) {
                const productRef = doc(db, "products", productId);
                const productSnap = await getDoc(productRef);

                if (productSnap.exists()) {
                    const product = productSnap.data();

                    const wishlistItemElement = `
                        <div class="wishlist-item">
                            <img src="${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p>Rs ${product.price}</p>
                            <button class="add-to-cart-btn" data-id="${productId}">Add to Cart</button>
                            <button class="remove-from-wishlist-btn" data-id="${productId}">Remove</button>
                        </div>
                    `;
                    wishlistContainer.insertAdjacentHTML('beforeend', wishlistItemElement);
                }
            }
        }
    } catch (error) {
        console.error("Error fetching wishlist items:", error);
    }
};

// Function to remove a product from the wishlist
const removeFromWishlist = async (user, productId) => {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const favorites = userData.favorites || [];

            // Remove the product from the wishlist
            const updatedFavorites = favorites.filter(id => id !== productId);

            // Update the wishlist in Firestore
            await updateDoc(userRef, { favorites: updatedFavorites });
            fetchWishlistItems(user); // Refresh the wishlist display
        }
    } catch (error) {
        console.error("Error removing product from wishlist:", error);
    }
};

// Function to add a product to the cart from the wishlist
const addToCartFromWishlist = async (user, productId) => {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const cart = userData.cart || [];

            // Add the product to the cart
            if (!cart.includes(productId)) {
                cart.push(productId);
                await updateDoc(userRef, { cart: cart });
                alert("Product added to cart!");
            } else {
                alert("Product is already in your cart.");
            }
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
};

// Event listeners for wishlist actions
document.addEventListener('click', async (e) => {
    const user = auth.currentUser;
    if (!user) return;

    if (e.target.classList.contains('remove-from-wishlist-btn')) {
        const productId = e.target.getAttribute('data-id');
        await removeFromWishlist(user, productId);
    }

    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = e.target.getAttribute('data-id');
        await addToCartFromWishlist(user, productId);
    }
});

// Use onAuthStateChanged to ensure the user is signed in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, fetch wishlist items
        fetchWishlistItems(user);
    } else {
        // User is not signed in, redirect to login page
        alert("You must be signed in to view your wishlist.");
        window.location.href = "index.html";
    }
});