import { React } from "react";
import { filterUser } from "../firebase/functions";

export default function Search(props) {

  const handleChange = async (e) => {
    let search = e ? e.target.value : "";

    let dbCollection = String(props.db).toLowerCase();
    dbCollection = dbCollection === "graduates" ? "users" : dbCollection;

    let returnValue = await filterUser(search, dbCollection);
    if (!returnValue)
      return;
    
    props.callback(returnValue);
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
