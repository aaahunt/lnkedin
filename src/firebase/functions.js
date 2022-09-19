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
      console.log(
        `Error: User ${data.firstName} ${data.lastName}  already exists`
      );
    } else {
      await setDoc(doc(db, "users", data.firstName + data.lastName), data);
      console.log("User created");
    }
  } catch (err) {
    console.log(err);
  }
};

export const userExists = async (data) => {
  try {
    const q = query(
      collection(db, "users"),
      where("firstName", "==", data.firstName),
      where("lastName", "==", data.lastName)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
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
    let data =  {...user.data(), id: user.id}
    users.push(data);
  });
  return users;
};
