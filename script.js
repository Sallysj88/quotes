// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// Firebase configuration (replace with your actual Firebase details)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission
document.getElementById("isbn-quote-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    // Get form values
    const customerEmail = document.getElementById("customer-email").value;
    const accountNumber = document.getElementById("account-number").value;
    const singleISBN = document.getElementById("single-isbn").value;
    const multipleISBNs = document.getElementById("multiple-isbns").value.split("\n").map(isbn => isbn.trim());

    try {
        // Add data to Firestore
        await addDoc(collection(db, "quotes"), {
            email: customerEmail,
            accountNumber: accountNumber,
            singleISBN: singleISBN,
            multipleISBNs: multipleISBNs,
            timestamp: new Date()
        });

        alert("Quote request submitted successfully!");
        document.getElementById("isbn-quote-form").reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error submitting quote request.");
    }
});
