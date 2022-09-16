import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const config = {
    apiKey : "AIzaSyC4QmDmwTtyi0WQoLB-I8MaVYcPo_umtAM",
    authDomain: "yellow-94486.firebaseapp.com",
    projectId: "yellow-94486",
    storageBucket: "yellow-94486.appspot.com",
    messagingSenderId: "16377800952",
    appId: "1:16377800952:web:6f8e574609b04e1e73330d",
    measurementId: "G-4GN594K8EV"
};
const app = initializeApp(config);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
