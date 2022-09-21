import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewUser from "./pages/ViewUser";

export default function App() {

  // if logged in 
  function isLoggedin() {
    return (getCookie("user") !== "")
  }

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  return (
    <BrowserRouter>
      {isLoggedin() && <Navigation />}

      <Routes>
        <Route path="/" element={isLoggedin() ? <Home /> : <Login />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="users" element={<Users />} />
        <Route path="register" element={<Register   />} />
        <Route path="viewuser" element={<ViewUser />} />
      </Routes>
    </BrowserRouter>
  );
}
