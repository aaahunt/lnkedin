import { React, useState, useEffect } from "react";
import { getSuggested } from "../firebase/functions";
import { getEmail } from "../functions/cookies";

const SuggestedMentors = (props) => {
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    let email = getEmail();
    getSuggested(props.type, email, 3)
      .then((res) => {
        setSuggested(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.type]);

  return (
    <section id="suggested">
      <h3>Top 3 Suggested {props.type}</h3>
      {props.type === "Graduates" ? <p>Based on your hobbies</p> : <p>Based on your desired skills and their skills</p>}
      {suggested &&
        suggested.map((item) => {
          let percentage = Math.round(item.similarity * 100);
          let link = "/user?id=" + item.email + "&type=" + props.type;
          return (
              <a href={link} key={item.firstName}>
                {item.firstName} ({percentage} % similarity)
              </a>
          );
        })}
    </section>
  );
};

export default SuggestedMentors;
