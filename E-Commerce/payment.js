import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
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
        alert("You must be signed in to access the payment page.");
        window.location.href = "index.html";
    }
});

document.getElementById('payment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        alert("You must be signed in to complete the payment.");
        return;
    }

    const cardNumber = document.getElementById('card-number').value;
    const cardName = document.getElementById('card-name').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (!cardNumber || !cardName || !expiryDate || !cvv) {
        alert("Please fill in all payment details.");
        return;
    }

    try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            paymentInfo: {
                cardNumber,
                cardName,
                expiryDate,
                cvv
            }
        });

        alert("Payment successful! Thank you for your purchase.");
        window.location.href = "products.html";
    } catch (error) {
        console.error("Error processing payment:", error);
        alert("Failed to process payment. Please try again.");
    }
});