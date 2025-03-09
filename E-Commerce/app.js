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
      console.log("User is signed in:", user.uid);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
          const userData = userSnap.data();
            console.log("User Data from Firestore:", userData);

          // Redirect unauthorized users from admin-dashboard.html
          if (window.location.pathname.includes("admin-dashboard.html") && userData.role !== "admin") {
              alert("Unauthorized access! Redirecting to login.");
              window.location.href = "index.html";
          }

          // Redirect unauthorized users from products.html
          if (window.location.pathname.includes("products.html") && userData.role !== "user") {
              alert("Unauthorized access! Redirecting to login.");
              window.location.href = "index.html";
          }
      } else {
          console.log("User data not found in Firestore!");
          alert("User role not found! Contact support.");
          await signOut(auth); // Logout invalid users
          window.location.href = "index.html";
      }
  } else {
      console.log("No user is signed in.");

      // Redirect to index.html if the user is not signed in and tries to access products.html or admin-dashboard.html
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