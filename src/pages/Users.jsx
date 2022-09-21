import { useState } from "react";
import React from "react";
import { filterUser } from "../firebase/functions";

export default function Users() {
  const [data, setData] = useState([]);

  const handleChange = async (e) => {
    let search = e ? e.target.value : ""

    let returnValue = await filterUser(search);
    if (!returnValue) {
      console.log("No search criteria was given");
      return;
    }

    setData(returnValue);
  };

  return (
    <div>
      <h1>Users</h1>

      <form>
        <input
          type="text"
          placeholder="Search name"
          name="search"
          onChange={handleChange}
        />
      </form>
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
