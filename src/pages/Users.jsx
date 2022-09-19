import { useState } from "react";
import User from "../components/User";
import { addData } from "../firebase/functions";

export default function Users() {
  const [search, setSearch] = useState("");

  function searchName(event) {
    event.preventDefault();

    let searchValue = event.target.elements.search.value;
    setSearch(searchValue);
    console.log(searchValue);
  }

  function addUser(event) {
    event.preventDefault();
    addData({
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
    });
  }

  return (
    <div>
      <h2>Users</h2>
      <form onSubmit={searchName}>
        <input type="text" placeholder="Search name" name="search" />
        <input type="submit" value="Search" />
      </form>
      {search && <User search={search} />}

      <h1>Add User</h1>
      <form onSubmit={addUser}>
        <input type="text" name="firstName" />
        <input type="text" name="lastName" />
        <input type="submit" value="Add user" />
      </form>
    </div>
  );
}
