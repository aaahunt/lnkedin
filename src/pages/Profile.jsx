import "../css/index.css";
import EditProfile from "../components/EditProfile";
import placeholderImage from "../img/placeholder.jpg";
import React, { useState, useEffect } from "react";
import { getData } from "../firebase/functions";
import { getCookie, setCookie } from "../functions/cookies";

function Profile(props) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    getData(getCookie("user")).then((result) => {
      setUserData(result);
    });
  }, []);

  const onLogoutClick = () => {
    props.hide(true);
    setCookie("user", "", -999)
    window.location('/login')
  };

  return (
    <div>
      <section className="profile">
        <div className="picture">
          <img src={placeholderImage} alt="Logo" id="placeholderImage" />
          {userData && (
            <h1 className="profileName">
              {userData.firstName} {userData.lastName}
            </h1>
          )}
          <input type="submit" className="profileName" onClick={onLogoutClick} value="Logout" />
        </div>
        <div>
          <EditProfile userData={userData} />
        </div>
      </section>
      <footer className="footer">
        <p className="text-footer">Copyright ©-Yellow Team</p>
      </footer>
    </div>
  );
}

export default Profile;
