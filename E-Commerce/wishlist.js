import { app, db, auth } from "./app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const fetchWishlistItems = async (user) => {
    const wishlistContainer = document.getElementById('wishlist-container');
    if (!wishlistContainer) return;
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

            wishlistContainer.innerHTML = ""; 
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

const removeFromWishlist = async (user, productId) => {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const favorites = userData.favorites || [];

            const updatedFavorites = favorites.filter(id => id !== productId);

            await updateDoc(userRef, { favorites: updatedFavorites });
            fetchWishlistItems(user); 
        }
    } catch (error) {
        console.error("Error removing product from wishlist:", error);
    }
};

const addToCartFromWishlist = async (user, productId) => {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const cart = userData.cart || [];

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

onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchWishlistItems(user);
    } else {
        alert("You must be signed in to view your wishlist.");
        window.location.href = "index.html";
    }
});