import { useState } from "react";
import User from "../components/User";

export default function Users() {
    const [search, setSearch] = useState("")

    function searchName(event) {
        event.preventDefault()

        let searchValue = event.target.elements.search.value
        setSearch(searchValue)                                                                    
        console.log(searchValue)
      }
    
  return (
    <div>
      <h2>Users</h2>
      <form onSubmit={searchName}>
        <input type="text" placeholder="Search name" name="search"/>
        <input type="submit" value="Search" />
      </form>
      {search && <User search={search} />}
    </div>
  );
}
