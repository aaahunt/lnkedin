import { addUser } from "../firebase/functions";

export default function About() {
  function submitUser(event) {
    event.preventDefault(); // Stops page refresh

    let data = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      officeLocation: event.target.elements.officeLocation.value,
      role: event.target.elements.role.value,
      hobbies: event.target.elements.hobbies.value,
      currentSkills: event.target.elements.currentSkills.value,
      desiredSkills: event.target.elements.desiredSkills.value,
      degree: event.target.elements.degree.value,
      bio: event.target.elements.bio.value,
      linkedin: event.target.elements.linkedin.value,
    };
    addUser(data);
  }

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={submitUser}>
        <input type="email" name="email" placeholder="you@mail.com" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <input type="text" name="firstName" placeholder="First name" required />
        <input type="text" name="lastName" placeholder="Last name" required />

        <select name="officeLocation">
          <option value="Bishopsgate">Bishopsgate</option>
          <option value="Sutton">Sutton</option>
          <option value="Nottingham">Nottingham</option>
          <option value="Leeds">Leeds</option>
          <option value="Cardiff">Cardiff</option>
          <option value="Southhampton">Southhampton</option>
        </select>
        <select name="role">
          <option value="UX">UX</option>
          <option value="Tech">Tech</option>
          <option value="Data Science">Data Science</option>
          <option value="Product">Product</option>
        </select>
        <input
          type="text"
          name="hobbies"
          placeholder="Hobbies (comma separated)"
        />
        <input
          type="text"
          name="currentSkills"
          placeholder="Skills (comma separated)"
        />
        <input type="text" name="degree" placeholder="Degree" />
        <input
          type="text"
          name="desiredSkills"
          placeholder="Desired Skills (comma separated)"
        />
        <textarea
          rows="4"
          name="bio"
          placeholder="Enter a short bio (optional)..."
        />

        <input
          type="text"
          name="linkedin"
          placeholder="Enter your linked in URL (optional)"
        />

        <input type="submit" value="Add user" />
      </form>
    </div>
  );
}
