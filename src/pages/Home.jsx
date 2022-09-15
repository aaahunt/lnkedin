import React, { useState } from "react";

export default function Home() {
  const [data, setData] = useState("");

  if (data.length === 0) {
    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }

  return (
    <div>
      {data && (
        <h2>
          Height of {data.name} is {data.height}
        </h2>
      )}
    </div>
  );
}
