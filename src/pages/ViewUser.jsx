import "../css/index.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { db } from "../firebase/init";
import { doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import placeholderImage from "../img/placeholder.jpg";

export default function ViewUser() {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const type = new URLSearchParams(search).get("type");
  const table = (type === "Graduates") ? "users" : "mentors"
  const [user, setUser] = useState([]);

  useEffect(() => {
    const docref = doc(db, table, id);
    getDoc(docref).then((res) => {
      let user = res.data();
      setUser(user);
    });
  }, [id, table]);

  return (
    <div className="ViewUser">
      {user && (
        <Card className="container">
          <CardContent className="flex-box">
            <div>
              <Typography variant="h5" component="div" align="left">
                {user.firstName} {user.lastName}
                <CardMedia
                  component="img"
                  id="placeholderImage"
                  image={placeholderImage}
                  alt="Logo"
                />
              </Typography>
            </div>
            <div>
              <Typography sx={{ mb: 1.5 }} align="center">
                <b>Scheme:</b> <b />
                {user.role} - <b>Office:</b> {user.officeLocation} -{" "}
                <b>Degree: </b>
                {user.degree}
                <br></br>
              </Typography>
              <Typography sx={{ mb: 1.5 }} align="left">
                <b>Bio</b> <br /> {user.bio}
              </Typography>
              <Typography sx={{ mb: 1.5 }} align="left">
                <b>Hobbies</b> <br /> {user.hobbies}
              </Typography>
              <Typography sx={{ mb: 1.5 }} align="left">
                <b>Current Skills</b> <br /> {user.currentSkills}
              </Typography>
              <Typography sx={{ mb: 1.5 }} align="left">
                <b>Desired Skills</b> <br /> {user.desiredSkills}
              </Typography>
              <CardActions>
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer external"
                >
                    <Button
                      color="primary"
                      id="view_profile"
                      href={user.linkedin}
                    >
                      Linkedin
                    </Button>
                </a>
              </CardActions>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
