import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewUser from "./pages/ViewUser";
import { getCookie } from "./functions/cookies";

export default function App() {
  
  function isLoggedin() {
    return getCookie("user") !== "";
  }

  return (
    <BrowserRouter>
      {isLoggedin() && <Navigation />}

      <Routes>
        <Route path="/" element={isLoggedin() ? <Home /> : <Login />} />
        <Route path="home" element={isLoggedin() ? <Home /> : <Login />} />
        <Route path="profile" element={isLoggedin() ? <Profile /> : <Login />} />
        <Route path="graduates" element={isLoggedin() ? <Users db="Graduates"  /> : <Login />} />
        <Route path="mentors" element={isLoggedin() ? <Users db="Mentors" /> : <Login />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
