const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.password,
      database: 'employee_db'
    },
    console.log(`Connected to the employee database.`)
  );

  const idToDelete = ''; // or any other value
db.query(`DELETE FROM employee_names WHERE id = ?`, [idToDelete], (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

db.query('SELECT * FROM employee_names', function (err, results) {
    console.log(results);
  });

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });  