import React, { useState } from "react";
import { getData, getAll } from "../firebase/functions";

export default function Home() {
  const [data, setData] = useState([]);


  return (
    <div>
      <button onClick={() => getData()}>Get Data</button>
      <button onClick={() => getAll()}>Get All</button>
      <button onClick={() => setData("Something")}>Meh</button>
      
      {data.map((item) => (
        <div key={item.PersonID}>
          <h1>
            Name: {item.FirstName} {item.LastName}
          </h1>
          <h3>{item.City}</h3>
        </div>
      ))}
    </div>
  );
}
