import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
