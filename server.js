//MariaDB API
//declarations and imports
const mariadb = require('mariadb');
const express = require('express');
require ('dotenv').config()

const app = express();
const port = process.env.PORT || 4000;



//create connection to mariadb server (localhost in this case)
const pool = mariadb.createPool({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PWD});
pool.getConnection()
    .then(conn => {
        console.log("Connected to mariadb with connection id: " + conn.threadId);
        conn.release(); //releases the pool
    })
    .catch(err => {
        console.log("Not connected due to error: " + err);
    });

//define the express app
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})


