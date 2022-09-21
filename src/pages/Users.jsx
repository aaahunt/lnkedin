import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Button, CardActions } from "@mui/material";
import Search from "../components/Search";
import { useLocation } from "react-router-dom";

export default function Users(props) {
  const [data, setData] = useState([]);

  let location = useLocation();

  React.useEffect(() => {
    setData([]);
    let input = document.getElementById("searchField");
    if (input) input.value = "";
  }, [location]);

  return (
    <div>
      <h1>{props.db}</h1>
      <Search callback={setData} db={props.db} />

      {data.map((item) => (
        <div key={item.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div" align="left">
                {item.firstName} {item.lastName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} align="left">
                Scheme: {item.role}
              </Typography>
              <Typography sx={{ mb: 1.5 }} align="left">
                Office: {item.officeLocation}
              </Typography>
              <CardActions>
                <Button
                  href={`/user?id=${item.id}`}
                  size="small"
                  color="primary"
                  style={{ marginRight: "auto" }}
                >
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
