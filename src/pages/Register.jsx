import { useEffect, useState } from "react";
import { addUser } from "../firebase/functions";
import { useNavigate } from "react-router";
const CryptoJS = require("crypto-js");

export default function About() {
  const [value, setValue] = useState("default");
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("are we redirecting", redirect)
    if(redirect){
      navigate('/login')
    }
  
  },[redirect,navigate])
  

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const submitUser = async (event) => {
    event.preventDefault(); // Stops page refresh

    let password = event.target.elements.password.value

    var encryptedPass = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), "AIzaSyC4QmDmwTtyi0WQoLB").toString();

    let data = {
      email: event.target.elements.email.value,
      password: encryptedPass,
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
    addUser(data).then(res =>
      setRedirect(res)
    );
    
  }

  return(
  <div className="registrationapp">
  <div className="login-form-registration">
    <div className="title">Sign Up</div>
    <div>
      <form onSubmit={submitUser} id="registration">
        <input type="text" name="firstName" placeholder="First name" required />
        <input type="text" name="lastName" placeholder="Last name" required />
        <input type="email" name="email" placeholder="Email Address" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <select name="officeLocation" defaultValue={value} onChange={handleChange}>
        <option value="default" disabled hidden>
          Location
        </option>
          <option value="Bishopsgate">Bishopsgate</option>
          <option value="Sutton">Sutton</option>
          <option value="Nottingham">Nottingham</option>
          <option value="Leeds">Leeds</option>
          <option value="Cardiff">Cardiff</option>
          <option value="Southampton">Southampton</option>
        </select>
        <select name="role" defaultValue={value} onChange={handleChange}>
        <option value="default" disabled hidden>
          Role
        </option>
          <option value="UX">UX</option>
          <option value="Tech">Tech</option>
          <option value="Data Science">Data Science</option>
          <option value="Product">Product</option>
        </select>
        <input type="text" name="degree" placeholder="Education" />
        <textarea
          rows="4"
          name="bio"
          placeholder="Enter a short bio (optional)..."
        />
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
        <input
          type="text"
          name="desiredSkills"
          placeholder="Desired Skills (comma separated)"
        />

        <input
          type="text"
          name="linkedin"
          placeholder="Enter your LinkedIn URL (optional)"
        />

        <input type="submit" value="Create Account" />
      </form>
    </div>
    </div>
</div>
  );
}
