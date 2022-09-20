import React, { useState } from "react";
import "../css/index.css"
import { checkLogin } from "../firebase/functions";

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    uname: "Invalid username or password",
    pass: "Invalid username or password"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    let uname = event.target.elements.uname.value;
    let pass = event.target.elements.pass.value;


    console.log("uname", uname)

    // Find user login info
    // const userData = database.find((user) => user.username === uname.value);
    const userData = await checkLogin(uname, pass)
    

    // Compare user info
    if (userData) {
        console.log("userData", userData)
        setIsSubmitted(true);
        setCookie("user", userData.username, 3)
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {renderErrorMessage("uname")}
        {renderErrorMessage("pass")}  
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div><p>User has been successfully signed in.</p>
        <li><a href="/Home">Click me to continue to the homepage!</a></li></div> : renderForm}
      </div>
    </div>
  );
}

export default Login;