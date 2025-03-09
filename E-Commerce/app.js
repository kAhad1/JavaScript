import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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

// Sign Up Logic
if (document.getElementById('sign-up-btn')) {
    document.getElementById('sign-up-btn').addEventListener("click", async (e) => {
      e.preventDefault();
        let name = document.getElementById('sign-up-name').value;
        let email = document.getElementById('sign-up-email').value;
        let password = document.getElementById('sign-up-pass').value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                role: "user",
                createdAt: new Date()
            });

            alert("Sign Up Successful! Please Log In.");
            document.getElementById('sign-in').style.display = 'block';
            document.getElementById('sign-up').style.display = 'none';

        } catch (error) {
            alert(error.message);
        }
    });
}

// Sign In Logic
if (document.getElementById('sign-in-btn')) {
    document.getElementById('sign-in-btn').addEventListener("click", async (e) => {
      e.preventDefault()
        let email = document.getElementById('sign-in-email').value;
        let password = document.getElementById('sign-in-pass').value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                if (userData.role === "admin") {
                    alert("Admin login successful!");
                    window.location.href = "admin-dashboard.html";
                    
                } else {
                    alert("User login successful!");
                    window.location.href = "products.html";
                }
            } else {
                alert("User role not found! Contact support.");
            }

        } catch (error) {
            alert(error.message);
        }
    });
}

// Toggle between Sign In and Sign Up forms
if (document.getElementById('signin-btn')) {
    document.getElementById('signin-btn').addEventListener('click', () => {
    
        document.getElementById('sign-in').style.display = "block";
        document.getElementById('sign-up').style.display = "none";
    });
}

if (document.getElementById('back-btn')) {
    document.getElementById('back-btn').addEventListener('click', () => {
        document.getElementById('sign-in').style.display = "none";
        document.getElementById('sign-up').style.display = "block";
    });
}

// Authentication State Listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
          const userData = userSnap.data();

          // Admins can access all pages
          if (userData.role === "admin") {
              console.log("Admin accessed:", window.location.pathname);
          } 
          // Users can only access products.html
          else if (userData.role === "user") {
              if (window.location.pathname.includes("admin-dashboard.html")) {
                  alert("Unauthorized access! Redirecting to products page.");
                  window.location.href = "products.html";
              }
          }
      }
  } else {
      // Redirect to login page if not signed in and trying to access protected pages
      if (window.location.pathname.includes("products.html") || window.location.pathname.includes("admin-dashboard.html")) {
          alert("You must sign in to access this page.");
          window.location.href = "index.html";
      }
  }
});


if (document.getElementById('sign-out-btn')) {
  document.getElementById('sign-out-btn').addEventListener('click', async () => {
      await signOut(auth);
      alert("You have been signed out.");
      window.location.href = "index.html";
  });
}