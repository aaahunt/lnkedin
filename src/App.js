import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Home from "./Home";
import Navigation from "./Navigation";

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="users/*" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

function Users() {
  return (
    <div>
      <h2>Users</h2>
      <form><input type="text" /></form>
      <Routes>
        <Route path=":userId" element={<User />} />
      </Routes>
    </div>
  );
}

function Profile() {
  return (<div>
    <h2>Profile</h2>
  </div>);
}


function User() {
  const params = useParams();
  return (
  <div>
    <h2>User ID: {params.userId}</h2>
    
  </div>);
}