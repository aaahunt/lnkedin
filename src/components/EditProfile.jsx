import React, { useState, useEffect } from "react";
import { editUser, getData } from "../firebase/functions";
import { getCookie } from "../functions/cookies";
import "../css/index.css";

function EditProfile() {
  const [state, setState] = useState();

  useEffect(() => {
    getData(getCookie("user")).then((result) => {
      setState(result);
    });
  }, []);

  async function submitButtonOn(event){
    event.preventDefault()
    let data = {
      email: event.target.elements.email.value,
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
    console.log(data)
    await editUser(data);
    
  }

  return (
    <div className="formtext">
      {state && (
        <div>
          <form onSubmit={submitButtonOn} id="registration">
            <input type="email" name="email" defaultValue={state.email} disabled />

            <input
              type="text"
              name="firstName"
              defaultValue={state.firstName}
              required
            />
            <input
              type="text"
              name="lastName"
              defaultValue={state.lastName}
              required
            />

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
              defaultValue={state.hobbies}
            />
            <input
              type="text"
              name="currentSkills"
              defaultValue={state.currentSkills}
            />
            <input type="text" name="degree" defaultValue={state.degree} />
            <input
              type="text"
              name="desiredSkills"
              defaultValue={state.desiredSkills}
            />
            <textarea
              rows="4"
              name="bio"
              defaultValue={state.bio}
            />

            <input
              type="text"
              name="linkedin"
              defaultValue={state.linkedin}
            />
            <input type="submit" value="Update Profile" />
          </form>
          
        </div>
      )}
    </div>
  );
}

export default EditProfile;
