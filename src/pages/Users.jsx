import { useState } from "react";
import User from "../components/User";
import NewUser from "./NewUser";

export default function Users() {
  const [search, setSearch] = useState("");
  const [showNewUser, setshowNewUser] = useState()

  function searchName(event) {
    event.preventDefault(); // Stops page refresh

    let searchValue = event.target.elements.search.value;
    setSearch(searchValue);
    console.log(searchValue);
  }


  return (
    <div>
      <h2>Users</h2>
      <button onClick={() => setshowNewUser(!showNewUser)}>{
        !showNewUser
          ? <div> Add new user </div> 
          : <div> Close </div> 
      }</button>
      {showNewUser && <NewUser />}
      <form onSubmit={searchName}>
        <input type="text" placeholder="Search name" name="search" />
        <input type="submit" value="Search" />
      </form>
      {search && <User search={search} />}
    </div>
  );
}
