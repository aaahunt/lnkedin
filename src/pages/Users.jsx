import { useState } from "react";
import React from "react";
import { getAll } from "../firebase/functions";
import { filterUser } from "../firebase/functions";

export default function Users() {
  const [data, setData] = useState([]);
  let textInput = React.createRef();

  const getAllUsers = async () => {
    let results = await getAll();
    setData(results);
  };

  const searchName = async (event) => {
    event.preventDefault(); // Stops page refresh


    let returnValue = await filterUser(textInput.current.value);
    console.log("returnValue", returnValue)
    setData(returnValue)
    console.log(data)

  }
  

  return (
    <div>
      <h2>Users</h2>
      

        <form>
          <input type="text" placeholder="Search name" name="search" ref={textInput}/>
        </form>
      

        {data.map((item) => (
        <div key={item.id}>
          <h1>
            {item.firstName} {item.lastName}
          </h1>
          {item.homeLocation && (
            <h3>
              Office: {item.officeLocation}, Home: {item.homeLocation}
            </h3>
          )}
        </div>
      ))}

    </div>
  );
}
