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
var stringSimilarity = require("string-similarity");

let cachedData = []

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
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const editUser = async (data) => {
  try {
    if (exceededQuota()) return `too many calls!`;

    const docRef = doc(db, "users", data.email);
    const userID = data.email;

    let res = await getDoc(docRef);
    callCounter++;
    let fullData = { ...res.data(), ...data };

    await setDoc(doc(db, "users", userID), fullData)
    callCounter++;
    return "User profile updated";

  } catch (err) {
    console.log(err);
    return "Error editing user";
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
    let userInfo = docSnap.data();
    delete userInfo.password;
    return userInfo;
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
    if (!dbPass) return;
    // Decrpyt password
    var bytes = CryptoJS.AES.decrypt(dbPass, "AIzaSyC4QmDmwTtyi0WQoLB");
    var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (email === dbEmail) {
      if (pass === decryptedPassword) {
        returnValue = { ...user.data(), id: user.id };
      }
    } else {
      return;
    }
  });

  return returnValue;
};

export const filterUser = async (search, dbCollection) => {
  let querySnapshot;

  if(cachedData.length === 0){
    const q = query(collection(db, dbCollection));
    if (exceededQuota()) return "too many calls!";
    querySnapshot = await getDocs(q);
    cachedData = querySnapshot
    callCounter++;
  } else {
    querySnapshot = cachedData
    console.log("use cached data")
  }

  let users = [];

  querySnapshot.forEach((doc) => {
    if (!search) {
      users.push({ ...doc.data(), id: doc.id });
    } else {
      let user = doc.data();
      Object.keys(user).every((item) => {
        if (user[item].toLowerCase().includes(search.toLowerCase())) {
          users.push({ ...doc.data(), id: doc.id });
          return false;
        } else {
          return true;
        }
      });
    }
  });
  return users;
};

function exceededQuota() {
  console.log("function call #" + (callCounter + 1))
  return callCounter > 1000;
}

export const getSuggested = async (type, email, n) => {
  if (exceededQuota()) return "too many calls!";
  let suggested = [];

  let userData = await getData(email);
  let desiredSkills = userData.desiredSkills;
  let hobbies = userData.hobbies;

  const table = type === "Graduates" ? "users" : "mentors";

  const q = query(collection(db, table));

  let querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let person = doc.data();
    let score;
    if (type === "Graduates") {
      score = stringSimilarity.compareTwoStrings(person.hobbies, hobbies);
    } else {
      score = stringSimilarity.compareTwoStrings(
        person.currentSkills,
        desiredSkills
      );
    }

    person = { ...person, similarity: score };
    if (person.email !== email) suggested.push(person);
  });

  suggested.sort((a, b) => b.similarity - a.similarity);

  return suggested.slice(0, n);
};
