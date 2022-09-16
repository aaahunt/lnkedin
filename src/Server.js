const express = require('express');
const mysql = require('mysql2');

const connection = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "password",
  database: "mydb",
});

const app = express();

// Creating a GET route that returns data from the 'users' table.
app.get("/users", function(req, res) {
  connection.getConnection(function(err, connection) {
    res.set('Access-Control-Allow-Origin', '*');
    
    if (!connection) res.send("no conn: " + err);

    connection.query("SELECT * FROM users", function(error, results) {
      if (error) {
        res.send("Query error: " + error);
      }

      res.send(results);
    });
  });
});

// Starting our server.
app.listen(4000, () => {
  console.log("Go to http://localhost:4000/users so you can see the data.");
});
