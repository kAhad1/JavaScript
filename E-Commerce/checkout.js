import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("You must be signed in to access the checkout page.");
        window.location.href = "index.html";
    } else {
        fetchCartItems();
    }
});
const fetchCartItems = async () => {
    const user = auth.currentUser;
    if (!user) {
        alert("You must be signed in to view your cart.");
        window.location.href = "index.html";
        return;
    }

    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const cart = userData.cart || [];

            const productsContainer = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            let total = 0;

            productsContainer.innerHTML = "";

            for (const productId of cart) {
                const productRef = doc(db, "products", productId);
                const productSnap = await getDoc(productRef);

                if (productSnap.exists()) {
                    const product = productSnap.data();
                    total += product.price;

                    const cartItem = document.createElement('li');
                    cartItem.className = 'list-group-item';
                    cartItem.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <span>${product.name}</span>
                        <span>Rs ${product.price}</span>
                    `;
                    productsContainer.appendChild(cartItem);
                }
            }

            cartTotal.textContent = `Rs ${total}`;
        }
    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
};


document.getElementById('shipping-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        alert("You must be signed in to proceed to payment.");
        return;
    }

    const fullName = document.getElementById('full-name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zipCode = document.getElementById('zip-code').value;
    const country = document.getElementById('country').value;

    if (!fullName || !address || !city || !zipCode || !country) {
        alert("Please fill in all shipping details.");
        return;
    }

    try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            shippingInfo: {
                fullName,
                address,
                city,
                zipCode,
                country
            }
        });

        alert("Shipping information saved. Redirecting to payment...");
        window.location.href = "payment.html"; 
    } catch (error) {
        console.error("Error saving shipping information:", error);
    }
});