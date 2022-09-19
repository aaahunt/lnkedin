import { db } from "../firebase/init";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
} from "firebase/firestore";

// Find documentation for firebase functions here: https://firebase.google.com/docs/firestore/quickstart

// https://firebase.google.com/docs/firestore/manage-data/add-data
export const addUser = async (userID, data) => {
  try {
    await setDoc(doc(db, "users", userID), data);
  } catch (err) {
    console.log(err);
  }
};

export const getData = async () => {
  const docRef = doc(db, "users", "y5ii2Nz8djpsDHbQQpOT");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const getAll = async () => {
  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
};
