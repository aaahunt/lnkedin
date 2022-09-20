import React, { useState } from "react";
import "../css/index.css"
import { checkLogin } from "../firebase/functions";

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    email: "Invalid email or password",
    pass: "Invalid email or password"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    let email = event.target.elements.email.value;
    let pass = event.target.elements.pass.value;

    // Find user login info
    const userData = await checkLogin(email, pass)

    // Compare user info
    if (userData) {
        console.log("userData", userData)
        setIsSubmitted(true);
        setCookie("user", userData.id, 3)
    } else {
      // Username not found
      setErrorMessages({ name: "email", message: errors.email });
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
        {renderErrorMessage("email")}
        {renderErrorMessage("pass")}  
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="underline">
        <li><a href="/Home">Forgot password?</a></li>
        </div>
        <div className="button-container">
          <input value="Login" type="submit" />
          <br></br>
        </div>
        <li><a href="/Register">Don't have an account? Sign up</a></li>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Login</div>
        
        {isSubmitted ? <div><p>User has been successfully signed in.</p>
        <li><a href="/Home">Click me to continue to the homepage!</a></li></div> : renderForm}
      </div>
    </div>
  );
}

export default Login;