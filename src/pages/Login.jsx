import React, { useEffect, useState } from "react";
import "../css/index.css";
import { checkLogin } from "../firebase/functions";
import { setCookie } from "../functions/cookies";

function Login() {
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    setCookie("user", "", -999) // clear logged in cookie
  }, [])
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    let email = event.target.elements.email.value;
    let pass = event.target.elements.pass.value;

    // Find user login info
    checkLogin(email, pass).then((userData) => {
      if (userData) {
        setCookie("user", userData.id, 3);
        window.location.replace("/home");
      } else {
        // Username not found
        setErrorMessage("Invalid email or password");
      }
    });
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="underline">
          <li>
            <a href="/Home">Forgot password?</a>
          </li>
        </div>
        <div className="button-container">
          <input value="Login" type="submit" />
          <br></br>
        </div>
        <li>
          <a href="/Register">Don't have an account? Sign up</a>
        </li>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="logo"><h1>RSG Bridge</h1></div>
      <div className="login-form">
        <div className="title">Login</div>
        {renderForm}
      </div>
    </div>
  );
}

export default Login;
