// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCiaF7ZSZxTCL_za67XmOzSqdL0WrCGLVk",
  authDomain: "ariesavvy.firebaseapp.com",
  projectId: "ariesavvy",
  storageBucket: "ariesavvy.firebasestorage.app",
  messagingSenderId: "982950111913",
  appId: "1:982950111913:web:a78bcd881b69ed5c8ad7b8",
  measurementId: "G-W5WBCK8NFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM references
const addImageForm = document.getElementById('addImageForm');
const galleryList = document.getElementById('galleryList');
const feedbackMessage = document.createElement('div');
feedbackMessage.style.marginTop = '10px';
feedbackMessage.style.fontWeight = 'bold';
addImageForm.after(feedbackMessage); // Insert feedback below form

// Load existing images
async function loadGallery() {
    galleryList.innerHTML = "";
    try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        if (querySnapshot.empty) {
            feedbackMessage.textContent = "No images in the gallery yet.";
            feedbackMessage.style.color = "#ffffff"; // white for info
        } else {
            querySnapshot.forEach(doc => {
                const data = doc.data();
                if (data.imageUrl) {
                    const img = document.createElement("img");
                    img.src = data.imageUrl;
                    img.classList.add("gallery-img");
                    galleryList.appendChild(img);
                }
            });
            feedbackMessage.textContent = "";
        }
    } catch (error) {
        console.error("Error fetching gallery:", error);
        feedbackMessage.textContent = "❌ Cannot load gallery. Check Firebase rules or connection.";
        feedbackMessage.style.color = "red";
    }
}

// Handle form submission
addImageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const imageUrl = document.getElementById('imageUrl').value.trim();
    if (!imageUrl) {
        feedbackMessage.textContent = "⚠️ Please enter a valid image URL.";
        feedbackMessage.style.color = "orange";
        return;
    }

    try {
        await addDoc(collection(db, "gallery"), { imageUrl });
        feedbackMessage.textContent = "✅ Image added successfully!";
        feedbackMessage.style.color = "#ffcc00"; // yellow
        addImageForm.reset();
        loadGallery(); // Refresh gallery
    } catch (error) {
        console.error("Error adding image: ", error);
        feedbackMessage.textContent = "❌ Failed to add image. Check Firebase rules or connection.";
        feedbackMessage.style.color = "red";
    }

    // Clear feedback after 3 seconds
    setTimeout(() => {
        feedbackMessage.textContent = "";
    }, 3000);
});

// Initial load
loadGallery();

