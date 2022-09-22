import { React, useEffect } from "react";
import { filterUser } from "../firebase/functions";

export default function Search({db, callback}) {

  useEffect(() => {
    let dbCollection = String(db).toLowerCase();
    dbCollection = dbCollection === "graduates" ? "users" : dbCollection;

    filterUser("", dbCollection).then(returnValue => {
      callback(returnValue);
    }).catch(() => console.log("error"))
    
  }, [db, callback])
  

  const handleChange = async (e) => {
    let search = e ? e.target.value : "";

    let dbCollection = String(db).toLowerCase();
    dbCollection = dbCollection === "graduates" ? "users" : dbCollection;

    let returnValue = await filterUser(search, dbCollection);
    if (!returnValue) {
      console.log("No search criteria was given");
      return;
    }

    callback(returnValue);
  };
  
  return (
    <form id="search">
      <input
        type="text"
        placeholder="Search name"
        name="search"
        id="searchField"
        onChange={handleChange}
      />
    </form>
  );
}
