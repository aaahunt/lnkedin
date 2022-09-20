import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="users" element={<Users />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
