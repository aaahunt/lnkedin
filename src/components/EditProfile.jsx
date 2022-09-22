import React, { useState } from "react"
import { editUser } from "../firebase/functions"
import { getEmail } from "../functions/cookies"
import "../css/index.css"

function EditProfile(props) {
  
  const [msg, setMsg] = useState()

  async function submitButtonOn(event) {
    event.preventDefault()
    let emailValue = getEmail()

    let data = {
      email: emailValue,
      officeLocation: event.target.elements.officeLocation.value,
      role: event.target.elements.role.value,
      hobbies: event.target.elements.hobbies.value,
      currentSkills: event.target.elements.currentSkills.value,
      desiredSkills: event.target.elements.desiredSkills.value,
      degree: event.target.elements.degree.value,
      bio: event.target.elements.bio.value,
      linkedin: event.target.elements.linkedin.value,
    }
    editUser(data).then((res) => {
      setMsg(res)
      console.log("response==", res)
    })
  }

  return (
    <div className="formtext">
      {props.userData && (
        <div>
          <form onSubmit={submitButtonOn} id="registration">

            <label htmlFor="officeLocation">Location</label>
            <select defaultValue={props.userData.officeLocation} name="officeLocation">
              <option value="Bishopsgate">Bishopsgate</option>
              <option value="Sutton">Sutton</option>
              <option value="Nottingham">Nottingham</option>
              <option value="Leeds">Leeds</option>
              <option value="Cardiff">Cardiff</option>
              <option value="Southhampton">Southhampton</option>
            </select>

            <label htmlFor="role">Role</label>
            <select defaultValue={props.userData.role} name="role">
              <option value="UX">UX</option>
              <option value="Tech">Tech</option>
              <option value="Data Science">Data Science</option>
              <option value="Product">Product</option>
            </select>
            <label htmlFor="hobbies">Hobbies</label>
            <input type="text" name="hobbies"  placeholder="Hobbies (comma separated)" defaultValue={props.userData.hobbies} />

            <label htmlFor="currentSkills">Skills</label>
            <input
              type="text"
              name="currentSkills"
              placeholder="Current skills (comma separated)"
              defaultValue={props.userData.currentSkills}
            />

            <label htmlFor="degree">Degree</label>
            <input type="text" name="degree" placeholder="Degree" defaultValue={props.userData.degree} />

            <label htmlFor="desiredSkills">Desired Skills</label>
            <input
              type="text"
              name="desiredSkills"
              placeholder="Desired skills (comma separated)"
              defaultValue={props.userData.desiredSkills}
            />

            <label htmlFor="bio">Bio</label>
            <textarea rows="4" name="bio" placeholder="Enter your bio here" defaultValue={props.userData.bio} />

            <label htmlFor="linkedin">LinkedIn URL</label>
            <input type="text" name="linkedin" placeholder="LinkedIn URL" defaultValue={props.userData.linkedin} />
            <input type="submit" value="Update Profile" />
          </form>
        </div>
      )}
      {msg && <p>{msg}</p>}
    </div>
  )
}

export default EditProfile
