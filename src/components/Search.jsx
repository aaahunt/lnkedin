import React from "react";
import { filterUser } from "../firebase/functions";

export default function Search(props) {
  const handleChange = async (e) => {
    let search = e ? e.target.value : "";

    let dbCollection = String(props.db).toLowerCase();
    console.log("dbCollection", dbCollection);

    dbCollection = (dbCollection === "graduates" ? "users" : dbCollection)

    let returnValue = await filterUser(search, dbCollection);
    if (!returnValue) {
      console.log("No search criteria was given");
      return;
    }

    props.callback(returnValue);
  };

  return (
    <form id="search">
      <input
        type="text"
        placeholder="Search name"
        name="search"
        onChange={handleChange}
      />
    </form>
  );
}
