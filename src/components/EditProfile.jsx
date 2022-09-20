import React, { useState, useEffect } from "react";
import { getData } from "../firebase/functions";
import { getCookie } from "../functions/cookies";
import "../css/index.css";

function EditProfile() {
  const [state, setState] = useState();

  useEffect(() => {
    getData(getCookie("user")).then((result) => {
      setState(result);
    });
  }, []);

  return (
    <div className="formtext">
      {state && (
        <div>
          <form id="registration">
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
