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
const CryptoJS = require("crypto-js");

let callCounter = 0;

// Find documentation for firebase functions here: https://firebase.google.com/docs/firestore/quickstart

// https://firebase.google.com/docs/firestore/manage-data/add-data
export const addUser = async (data) => {
  try {
    if (await userExists(data)) {
      return `Error: User with email ${data.email} already exists`;
    } else {
      if (exceededQuota()) return `too many calls!`;
      await setDoc(doc(db, "users", data.email), data);
      callCounter++;
      return `User with email ${data.email} created`;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const userExists = async (data) => {
  try {
    const citiesRef = collection(db, "users");
    const q = query(citiesRef, where("email", "==", data.email));
    if (exceededQuota()) return `too many calls!`;
    const querySnapshot = await getDocs(q);
    callCounter++;

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
  if (exceededQuota()) return `too many calls!`;
  const docSnap = await getDoc(docRef);
  callCounter++;

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
};

export const getAll = async () => {
  const q = query(collection(db, "users"));
  if (exceededQuota()) return `too many calls!`;
  const results = await getDocs(q);
  callCounter++;

  let users = [];
  results.forEach((user) => {
    let data = { ...user.data(), id: user.id };
    users.push(data);
  });
  return users;
};

export const checkLogin = async (email, pass) => {

  const q = query(collection(db, "users"));
  if (exceededQuota()) return `too many calls!`;
  const results = await getDocs(q);
  callCounter++;

  let returnValue = false;

  results.forEach((user) => {
    let dbEmail = user.data().email;
    let dbPass = user.data().password;
    console.log(dbPass)
    if(!dbPass) return;
    // Decrpyt password
    var bytes = CryptoJS.AES.decrypt(dbPass, 'AIzaSyC4QmDmwTtyi0WQoLB');
    var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (email === dbEmail) {
      if (pass === decryptedPassword) {
        returnValue = {...user.data(), id: user.id};
      } else {
        console.log("pass is not the same", pass, decryptedPassword);
      }
    } else {
      return;
    }
  });

  return returnValue;
};

export const filterUser = async (search) => {
  
  const q = query(collection(db, "users"));
  if (exceededQuota()) return "too many calls!";
  const querySnapshot = await getDocs(q);
  callCounter++;

  let users = [];

  querySnapshot.forEach((doc) => {
    if (!search){
      users.push({...doc.data(), id: doc.id});
    } else {
      let user = doc.data();
      Object.keys(user).every((item) => {
        if (user[item].toLowerCase().includes(search.toLowerCase())) {
          users.push({...doc.data(), id: doc.id});
          return false;
        } else{
          return true;
        }
      });
    }
    
  });
  return users;
};

function exceededQuota() {
  console.log("call counter: " + callCounter);
  return callCounter > 1000;
}
