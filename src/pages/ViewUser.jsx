import "../css/index.css";
import * as React from "react";
import { useState } from "react";
import { db } from "../firebase/init";
import { doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState([]);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  const docref = doc(db, "users", id);
  if (user.length < 1) {
    getDoc(docref).then((res) => {
      let user = res.data();
      setUser(user);
      console.log(user);
    });
  }

  return (
    <div className="ViewUser">
      {user && (
        <div className="blog-container">
          <h4>
            {user.firstName} {user.lastName}
          </h4>
          <p>{user.hobbies}</p>
        </div>
      )}
    </div>
  );
}
