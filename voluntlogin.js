// ✅ Ensure Firebase is initialized (Use CDN instead of import)
if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyCNzH9Ybtb4TUbUgHBI9Uv3f_o2S8ioaco",
        authDomain: "home-ff487.firebaseapp.com",
        projectId: "home-ff487",
        storageBucket: "home-ff487.appspot.com",
        messagingSenderId: "1042502575422",
        appId: "1:1042502575422:web:5fe53e404e3d5c0dd8f86f",
        measurementId: "G-WS7CHSE4NV"
    });
}
const db = firebase.firestore();

// ✅ Handle Login Form Submission
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById("message");

    if (!name || !password) {
        messageElement.style.color = "red";
        messageElement.innerText = "Please enter both name and password.";
        return;
    }

    try {
        // 🔎 Check Firestore for a matching volunteer
        const querySnapshot = await db.collection("volunteers")
            .where("name", "==", name)
            .where("password", "==", password)
            .get();

        if (!querySnapshot.empty) {
            // ✅ Login Successful - Redirect to Dashboard
            messageElement.style.color = "green";
            messageElement.innerText = "Login successful! Redirecting...";

            // Store the logged-in user details in sessionStorage
            querySnapshot.forEach((doc) => {
                sessionStorage.setItem("volunteerName", doc.data().name);
            });

            setTimeout(() => {
                window.location.href = "dashboard.html"; // Redirect to Dashboard
            }, 2000);
        } else {
            // ❌ Invalid Credentials
            messageElement.style.color = "red";
            messageElement.innerText = "Invalid name or password. Please try again.";
        }
    } catch (error) {
        console.error("Login Error:", error);
        messageElement.style.color = "red";
        messageElement.innerText = "An error occurred. Please try again.";
    }
});
