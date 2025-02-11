// Firebase configuration (from your Firebase project settings)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to handle form submission
document.getElementById("isbnForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get form values
  const email = document.getElementById("email").value;
  const subAccount = document.getElementById("subAccount").value;
  const isbnList = document.getElementById("isbnList").value.split("\n"); // Split by new lines for multiple ISBNs

  // Validate input (basic check)
  if (!email || !isbnList.length) {
    alert("Please enter an email and at least one ISBN.");
    return;
  }

  // Store data in Firestore
  db.collection("quotes").add({
    email: email,
    subAccount: subAccount,
    isbnList: isbnList,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("ISBNs submitted successfully!");
    document.getElementById("isbnForm").reset(); // Clear form after submission
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
});
