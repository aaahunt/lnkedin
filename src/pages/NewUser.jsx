import { addUser } from "../firebase/functions";

export default function NewUser() {
  
  function submitUser(event) {
    event.preventDefault(); // Stops page refresh

    let userID = '';
    let data = {
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
    };
    addUser(userID, data);
  }

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={submitUser}>
        <input type="text" name="firstName" />
        <input type="text" name="lastName" />
        <input type="submit" value="Add user" />
      </form>
    </div>
  );
}
