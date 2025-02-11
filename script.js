// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC03I0askcS6NHThKLbF2sd-swS0Hs43lg",
    authDomain: "quote-automation-c0de2.firebaseapp.com",
    projectId: "quote-automation-c0de2",
    storageBucket: "quote-automation-c0de2.appspot.com",  // ✅ FIXED DOMAIN
    messagingSenderId: "519166658519",
    appId: "1:519166658519:web:a654d09e38e42f1b1ced92",
    measurementId: "G-1YGRXYL4BW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission
document.getElementById("isbn-quote-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const email = document.getElementById("customer-email").value;
    const accountNumber = document.getElementById("account-number").value;
    const singleISBN = document.getElementById("single-isbn").value;
    const multipleISBNs = document.getElementById("multiple-isbns").value.split("\n").map(isbn => isbn.trim()).filter(isbn => isbn !== ""); // Convert to array

    try {
        // Store data in Firestore
        await addDoc(collection(db, "quotes"), {
            email: email,
            accountNumber: accountNumber || "N/A",
            singleISBN: singleISBN || "N/A",
            multipleISBNs: multipleISBNs.length ? multipleISBNs : "N/A",
            timestamp: new Date()
        });

        alert("Quote request submitted successfully!");
        document.getElementById("isbn-quote-form").reset(); // Clear form
    } catch (error) {
        console.error("Error submitting request: ", error);
        alert("There was an error submitting your request. Please try again.");
    }
});
