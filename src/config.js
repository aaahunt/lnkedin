// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC4QmDmwTtyi0WQoLB-I8MaVYcPo_umtAM",
  authDomain: "yellow-94486.firebaseapp.com",
  projectId: "yellow-94486",
  storageBucket: "yellow-94486.appspot.com",
  messagingSenderId: "16377800952",
  appId: "1:16377800952:web:6f8e574609b04e1e73330d",
  measurementId: "G-4GN594K8EV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }