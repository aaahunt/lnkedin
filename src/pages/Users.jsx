import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Button, CardActions } from "@mui/material";
import Search from "../components/Search";
import { useLocation } from "react-router-dom";
import Suggested from "../components/Suggested";
import placeholderImage from "../img/placeholder.jpg"

export default function Users(props) {
  const [data, setData] = useState([]);
  let location = useLocation();

  React.useEffect(() => {
    setData([]);
    let input = document.getElementById("searchField");
    if (input) input.value = "";
  }, [location]);

  return (
    <section className="section">
      <div className="full">
        <h1>{props.db}</h1>
        <p>Search our full directory of {props.db}</p>
        <Suggested type={props.db} />
        <Search callback={setData} db={props.db} />

        <section className="cards">
          {data.map((item) => (
            <div key={item.id}>
              <Card sx={{ minWidth: 275 }} className="card">
                <CardContent className="card-inner">
                  <div className="image-details">
                    <img
                      src={placeholderImage}
                      alt="Logo"
                      id="placeholderImage"
                    />
                  </div>
                  <div className="left-details">
                    <Typography variant="h5" component="div" align="left">
                      {item.firstName} {item.lastName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} align="left">
                      {item.role} {props.db.substring(0, props.db.length - 1)}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} align="left">
                      {item.officeLocation}
                    </Typography>
                  </div>

                  <div className="right-details">
                    <CardActions>
                      <Button
                        href={`/user?id=${item.id}&type=${props.db}`}
                        color="primary"
                        id="view_profile"
                      >
                        View Profile
                      </Button>
                    </CardActions>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
