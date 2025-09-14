// Import Firebase functions (modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Firebase configuration
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

// Reference to the gallery grid
const galleryGrid = document.getElementById('gallery-grid');

// Fetch images from Firestore
async function loadGallery() {
  try {
    const querySnapshot = await getDocs(collection(db, "gallery"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.imageUrl) {
        const img = document.createElement("img");
        img.src = data.imageUrl;
        img.alt = "Gallery Image";
        img.classList.add("gallery-img");
        galleryGrid.appendChild(img);
      }
    });
  } catch (error) {
    console.error("Error fetching gallery images: ", error);
  }
}

// Load images on page load
loadGallery();
