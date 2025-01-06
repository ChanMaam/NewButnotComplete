// Import the Firebase modules you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage module

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEg7OdjNsjR_bkfxw4bfDm_wWwbDuk5jo",
  authDomain: "weatherguard2-4d843.firebaseapp.com",
  projectId: "weatherguard2-4d843",
  storageBucket: "weatherguard2-4d843.appspot.com",
  messagingSenderId: "629257255711",
  appId: "1:629257255711:web:08c01d90a237d308094e2a",
  measurementId: "G-001DELYN4C",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase modules
const auth = getAuth(app); // Firebase Authentication
const db = getFirestore(app); // Firebase Firestore
const storage = getStorage(app); // Firebase Storage

// Export Firebase modules
export { auth, db, storage };
