import { app, db, auth } from "./app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const fetchCartItems = async (user) => {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return; 
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

            const productQuantities = {};
            for (const productId of cart) {
                productQuantities[productId] = (productQuantities[productId] || 0) + 1;
            }

            cartContainer.innerHTML = "";
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
                        <div class="cart-item" data-id="${productId}">
                            <img src="${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p>Rs ${product.price} x ${quantity} = Rs ${itemTotal}</p>
                            <button class="decrease-quantity-btn" data-id="${productId}">-</button>
                            <span class="quantity">${quantity}</span>
                            <button class="increase-quantity-btn" data-id="${productId}">+</button>
                            <button class="remove-from-cart-btn" data-id="${productId}">Remove</button>
                        </div>
                    `;
                    cartContainer.insertAdjacentHTML('beforeend', cartItemElement);
                }
            }

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

const updateQuantityInDOM = (productId, newQuantity) => {
    const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
    if (cartItem) {
        const quantityElement = cartItem.querySelector('.quantity');
        const priceElement = cartItem.querySelector('p:nth-of-type(2)'); 
        const productPrice = parseFloat(priceElement.textContent.split('Rs ')[1].split(' x')[0]);

        quantityElement.textContent = newQuantity;

        const newItemTotal = productPrice * newQuantity;
        priceElement.textContent = `Rs ${productPrice} x ${newQuantity} = Rs ${newItemTotal}`;
    }

    updateTotalAmount();
};

const updateTotalAmount = () => {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalAmount = 0;

    cartItems.forEach((item) => {
        const priceElement = item.querySelector('p:nth-of-type(2)');
        const itemTotal = parseFloat(priceElement.textContent.split('Rs ')[2]);
        totalAmount += itemTotal;
    });

    const totalElement = document.querySelector('.cart-total h3');
    if (totalElement) {
        totalElement.textContent = `Total Amount: Rs ${totalAmount}`;
    }
};

const removeFromCart = async (user, productId) => {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const cart = userData.cart || [];

            const updatedCart = cart.filter(id => id !== productId);

            
            await updateDoc(userRef, { cart: updatedCart });
            fetchCartItems(user); 
        }
    } catch (error) {
        console.error("Error removing product from cart:", error);
    }
};


const increaseQuantity = async (user, productId) => {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const cart = userData.cart || [];

            cart.push(productId);

                       await updateDoc(userRef, { cart: cart });

            const currentQuantity = parseInt(document.querySelector(`.cart-item[data-id="${productId}"] .quantity`).textContent);
            updateQuantityInDOM(productId, currentQuantity + 1);
        }
    } catch (error) {
        console.error("Error increasing product quantity:", error);
    }
};

const decreaseQuantity = async (user, productId) => {
    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const cart = userData.cart || [];

            const index = cart.indexOf(productId);
            if (index !== -1) {
                cart.splice(index, 1);

                await updateDoc(userRef, { cart: cart });

             
                const currentQuantity = parseInt(document.querySelector(`.cart-item[data-id="${productId}"] .quantity`).textContent);
                if (currentQuantity > 1) {
                    updateQuantityInDOM(productId, currentQuantity - 1);
                } else {
                    fetchCartItems(user);
                }
            }
        }
    } catch (error) {
        console.error("Error decreasing product quantity:", error);
    }
};

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

onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchCartItems(user);
    } else {
        alert("You must be signed in to view your cart.");
        window.location.href = "index.html";
    }
});