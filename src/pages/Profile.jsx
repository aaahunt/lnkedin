import "../css/index.css"
import EditProfile from "../components/EditProfile"
import placeholderImage from "../img/placeholder.jpg"
import React, { useState, useEffect } from "react"
import { getData } from "../firebase/functions"
import { getCookie } from "../functions/cookies"

function Profile() {

  const [userData, setUserData] = useState()
  
  useEffect(() => {
    getData(getCookie("user")).then((result) => {
      setUserData(result)
    })
  }, [])

  return (
    <div>
      <section className="profile">
        <div>
          <img src={placeholderImage} alt="Logo" id="placeholderImage" />
          {userData && <h1 className="profileName">{userData.firstName} {userData.lastName}</h1>}
        </div>
        <div>
          <EditProfile userData={userData} />
        </div>
      </section>
      <footer className="footer">
        <p className="text-footer">Copyright ©-Yellow Team</p>
      </footer>
    </div>
  )
}

export default Profile
