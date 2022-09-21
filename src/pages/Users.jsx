import { useState } from "react";
import User from "../components/User";
import NewUser from "./NewUser";
import { getAll } from "../firebase/functions";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Button, CardActions } from '@mui/material';

export default function Users() {
  const [search, setSearch] = useState("");
  const [showNewUser, setshowNewUser] = useState();
  const [data, setData] = useState([]);

  const getAllUsers = async () => {
    let results = await getAll();
    setData(results);
  };

  function searchName(event) {
    event.preventDefault(); // Stops page refresh

    let searchValue = event.target.elements.search.value;
    setSearch(searchValue);
    console.log(searchValue);
  }

 
  return (
    <div>
      <h2>Users</h2>
      <button onClick={() => setshowNewUser(!showNewUser)}>
        {!showNewUser ? <div> Add new user </div> : <div> Close </div>}
      </button>
      {showNewUser ? (
        <NewUser />
      ) : (
        <form onSubmit={searchName}>
          <input type="text" placeholder="Search name" name="search" />
          <input type="submit" value="Search" />
        </form>
      )}
      {search && <User search={search} />}

      <button onClick={getAllUsers}>Get All</button>
     
     
      {data.map((item) => (
        <div key={item.id}>
          <Card sx={{ minWidth: 275 }}>
      <CardContent>
          <Typography variant="h5" component="div" align="left" >
          {item.firstName} {item.lastName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} align="left">
          Scheme: {item.role}
        </Typography>
        <Typography sx={{ mb: 1.5 }} align="left">
          Office: {item.officeLocation}
        </Typography>
        <CardActions>
        <Button href={`/user?id=${item.id}`} size="small" color="primary" style={{marginRight:"auto"}} > 
          View Profile
        </Button>
        </CardActions>
          </CardContent>
          </Card>
     
        </div>
      ))}
    </div>
  );
}

