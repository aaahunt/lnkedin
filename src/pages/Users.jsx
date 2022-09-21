import { useState } from "react";
import User from "../components/User";
import NewUser from "./NewUser";
import { getAll } from "../firebase/functions";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Button, CardActions } from '@mui/material';
import Search from "../components/Search";

export default function Users(props) {

  const [data, setData] = useState([]);

 
  return (
    <div>
      <h1>{props.db}</h1>
      <Search callback={setData} db={props.db} />

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

