require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
var mysql = require('mysql');
const PORT = process.env.PORT || 8080;

// database connection
var database = mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password
});
database.connect(function (err) {
    if (err) console.log(err);
    global.database = database;
    console.log("database connection successful............");
});


//middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());



app.listen(PORT, () => console.log(`Server listening on ${PORT}`));