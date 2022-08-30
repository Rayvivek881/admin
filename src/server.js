require('dotenv').config();
const express = require('express');
const app = express(), PORT = 8080;
const cors = require('cors');
var mysql = require('mysql');

// database connection
var database = mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password
});
database.connect(function (err) {
    if (err == null) {
        this.database = database;
        console.log("database connection successful........");
    } else console.log("database not connected", err);
})

//middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Routers
app.use('/api/user', require('./routes/user.js'));
app.use('/admin', require('./routes/admin.js'));


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));