import React, { useState, useEffect } from "react";
import { db } from "../config";
import {collection, addDoc} from 'firebase/firestore'

export default function Home() {
  const [data, setData] = useState([]);


  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'users'), {
        firstName: "Testerman",
        lastName: "description",
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {

    handleSubmit();

    fetch("http://localhost:4000/users")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      });
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.PersonID}>
          <h1>Name: {item.FirstName} {item.LastName}</h1>
          <h3>{item.City}</h3>
        </div>
      ))}
    </div>
  );
}
