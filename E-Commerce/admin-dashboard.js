import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, getDocs, Timestamp, updateDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBikyi3yyesNE5ZsM1P3uhLg03f4TIPz1Q",
    authDomain: "e-commerce-cffcc.firebaseapp.com",
    projectId: "e-commerce-cffcc",
    storageBucket: "e-commerce-cffcc.firebasestorage.app",
    messagingSenderId: "341756955843",
    appId: "1:341756955843:web:a950743727b5b080f1a676"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const addProduct = async (productData) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("You must be signed in to add products");
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists() || userSnap.data().role !== "admin") {
            throw new Error("Unauthorized: Only admins can add products");
        }

        const productsCollection = collection(db, "products");
        await addDoc(productsCollection, {
            ...productData,
            createdBy: user.uid,
            createdAt: Timestamp.now()
        });
        
        alert("Product added successfully!");
        fetchProducts();
    } catch (error) {
        console.error("Error adding product:", error);
        alert(error.message || "Failed to add product. Please try again.");
    }
};

const updateProduct = async (productId, productData) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("You must be signed in to update products");
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists() || userSnap.data().role !== "admin") {
            throw new Error("Unauthorized: Only admins can update products");
        }

        const productRef = doc(db, "products", productId);
        await updateDoc(productRef, {
            ...productData,
            updatedBy: user.uid,
            updatedAt: Timestamp.now()
        });
        
        alert("Product updated successfully!");
        resetForm();
        fetchProducts();
    } catch (error) {
        console.error("Error updating product:", error);
        alert(error.message || "Failed to update product. Please try again.");
    }
};

const fetchProducts = async () => {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        productsContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const createdAt = product.createdAt instanceof Timestamp 
                ? product.createdAt.toDate().toLocaleDateString()
                : 'Date not available';
                
            const productElement = `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card h-100 shadow-sm" data-id="${doc.id}">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>Rs ${product.price}</strong></p>
                            <p class="card-text"><small class="text-muted">Added: ${createdAt}</small></p>
                            <button class="btn btn-primary edit-btn">Edit</button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.insertAdjacentHTML('beforeend', productElement);
        });

        setupEditButtons();
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

const setupEditButtons = () => {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const productId = e.target.closest('.card').dataset.id;
            const productRef = doc(db, "products", productId);
            const productSnap = await getDoc(productRef);
            
            if (productSnap.exists()) {
                const product = productSnap.data();
                document.getElementById('edit-product-id').value = productId;
                document.getElementById('product-name').value = product.name;
                document.getElementById('product-description').value = product.description;
                document.getElementById('product-price').value = product.price;
                document.getElementById('product-image').value = product.image;
                
                document.getElementById('submit-btn').textContent = 'Update Product';
                document.getElementById('cancel-edit').style.display = 'block';
                
                // Scroll to form
                document.getElementById('add-product').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
};

const resetForm = () => {
    document.getElementById('product-form').reset();
    document.getElementById('edit-product-id').value = '';
    document.getElementById('submit-btn').textContent = 'Add Product';
    document.getElementById('cancel-edit').style.display = 'none';
};

document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("product-form");
    const cancelEditBtn = document.getElementById("cancel-edit");

    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', resetForm);
    }

    if (productForm) {
        productForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const productId = document.getElementById('edit-product-id').value;
            const name = document.getElementById("product-name").value;
            const description = document.getElementById("product-description").value;
            const price = parseFloat(document.getElementById("product-price").value);
            const image = document.getElementById("product-image").value;

            if (!name || !description || !price || !image) {
                alert("Please fill in all fields.");
                return;
            }

            const productData = {
                name,
                description,
                price,
                image
            };

            if (productId) {
                await updateProduct(productId, productData);
            } else {
                await addProduct(productData);
            }

            resetForm();
        });
    }

    fetchProducts();
});

const signOutBtn = document.getElementById('sign-out-btn');
if (signOutBtn) {
    signOutBtn.addEventListener('click', async () => {
        try {
            await auth.signOut();
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    });
}
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();

            if (userData.role !== "admin") {
                alert("Unauthorized access! Redirecting to products page.");
                window.location.href = "products.html";
            }
        }
    } else {
        alert("You must sign in to access this page.");
        window.location.href = "index.html";
    }
});