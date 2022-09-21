import { useState } from "react";
import React from "react";
import Search from "../components/Search";

export default function Users(props) {

  const [data, setData] = useState([]);

  return (
    <div>
      <h1>{props.db}</h1>
      <Search callback={setData} db={props.db} />

      {data.map((item) => (
        <div key={item.id}>
          <h1>
            {item.firstName} {item.lastName}
          </h1>
          <p>{item.officeLocation}</p>
        </div>
      ))}
    </div>
  );
}
