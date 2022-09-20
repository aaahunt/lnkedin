import { db } from "../firebase/init";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// Find documentation for firebase functions here: https://firebase.google.com/docs/firestore/quickstart

// https://firebase.google.com/docs/firestore/manage-data/add-data
export const addUser = async (data) => {
  try {
    if (await userExists(data)) {
      console.log(`Error: User with email ${data.email} already exists`);
    } else {
      await setDoc(doc(db, "users", data.email), data);
      console.log("User created");
    }
  } catch (err) {
    console.log(err);
  }
};

export const userExists = async (data) => {
  try {
    const citiesRef = collection(db, "users");
    const q = query(citiesRef, where("email", "==", data.email));
    const querySnapshot = await getDocs(q);

    let found = false;

    querySnapshot.forEach((doc) => {
      if (doc.data().email === data.email) found = true;
    });

    return found;
  } catch (error) {
    console.log(error);
    return true;
  }
};

export const getData = async (userID) => {
  const docRef = doc(db, "users", userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
};

export const getAll = async () => {
  const q = query(collection(db, "users"));
  const results = await getDocs(q);

  let users = [];
  results.forEach((user) => {
    let data = { ...user.data(), id: user.id };
    users.push(data);
  });
  return users;
};

export const checkLogin = async (email, pass) => {
  const q = query(collection(db, "users"));
  const results = await getDocs(q);

  let returnValue = false;

  results.forEach((user) => {
    let dbEmail = user.data().email;
    let dbPass = user.data().password;

    if (email === dbEmail) {
      if (pass === dbPass) {
        returnValue = user.data();
      } else {
        console.log("pass is not the same", pass, dbPass);
      }
    } else {
      return;
    }
  });

  return returnValue;
};
