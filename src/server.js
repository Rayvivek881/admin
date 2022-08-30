require('dotenv').config();
const express = require('express');
const app = express(), PORT = process.env.PORT | 8080;
const cors = require('cors'), mysql = require('mysql');


// database connection
var database = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});
database.connect(function (err) {
    if (err == null) {
        global.database = database, global.message = "working"
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