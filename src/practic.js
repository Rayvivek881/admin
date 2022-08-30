require('dotenv').config();
const express = require('express');
const app = express(), PORT = 8080;
const cors = require('cors'), mysql = require('mysql');
var database = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});
let sql = `CREATE TABLE User (
    mobile int NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255),
    message varchar(500),
    UNIQUE(mobile)
)`
database.connect(function (err) {
    if (err == null) {
        global.database = database, global.message = "working"
        console.log("database connection successful........");
        database.query(sql)
    } else console.log("database not connected", err);
})