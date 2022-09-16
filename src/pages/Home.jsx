import React, { useState, useEffect } from "react";

//const app = initializeApp(firebaseConfig);

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
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
