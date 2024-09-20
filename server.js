const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'rci_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Database error');
    }

    if (results.length > 0) {
      const user = results[0];

      if (user.password === password) {
        console.log('Login successful');
        return res.redirect('/success.html');  
      } else {
        console.log('Invalid password');
        return res.send('Invalid username or password');
      }
    } else {
      console.log('User not found');
      return res.send('User not found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
