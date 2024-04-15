// make simple server with express
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const config = {
  host: 'db',
  port: 3306,
  user: 'fc',
  password: 'fc',
  database: 'fc'
}

let conn;

async function db() {
  const sqlCreate = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
  )`;

  await conn.query(sqlCreate);
}

app.get('/', async (req, res) => {
  const sqlInsert = `INSERT INTO users (name) VALUES ('fullcycle')`;
  await conn.query(sqlInsert);

  const [rows] = await conn.query('SELECT * FROM users');
  res.send(`
    <h1>Full Cycle Rocks!</h1>
    <ul>
      ${rows.map(row => `<li>${row.name}</li>`).join('')}
    </ul>
  `);

})

app.listen(8080, async () => {
  console.log('Server is running on port 8080');
  try {
    conn = await mysql.createConnection(config)
    await db()
  } catch (error) {
    console.log('Error: ', error);
  }
});
