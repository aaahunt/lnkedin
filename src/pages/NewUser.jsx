import { addUser } from "../firebase/functions";

export default function NewUser() {
  function submitUser(event) {
    event.preventDefault(); // Stops page refresh

    let data = {
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      officeLocation: event.target.elements.officeLocation.value,
      homeLocation: event.target.elements.homeLocation.value,
      age: event.target.elements.age.value,
      hobbies: event.target.elements.hobbies.value,
      bio: event.target.elements.bio.value,
    };
    addUser(data);
  }

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={submitUser}>
        <input type="text" name="firstName" placeholder="First name" required />
        <input type="text" name="lastName" placeholder="Last name" required />
        <input
          type="text"
          name="officeLocation"
          placeholder="Office location"
          required
        />
        <input type="text" name="homeLocation" placeholder="Home location" />
        <select name="age">
          <option value="1820">18-20</option>
          <option value="2125">21-25</option>
          <option value="25plus">25+</option>
        </select>
        <input
          type="text"
          name="hobbies"
          placeholder="Hobbies (comma separated)"
        />
        <textarea
          rows="4"
          name="bio"
          placeholder="Enter a short bio (optional)..."
        />

        <input type="submit" value="Add user" />
      </form>
    </div>
  );
}
