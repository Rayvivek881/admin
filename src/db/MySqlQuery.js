require('dotenv').config();
const mysql = require('mysql')
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } = process.env;
var database;

const connection = () => {
    database = mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database : DB_DATABASE
    });

    return new Promise((resolve, reject) => {
        database.connect((error, results) => {
            if (error != null) 
                reject(error);
            else resolve(results);
        })
    });
};

const query = (sql) => {
    return new Promise((resolve, reject) => {
        database.query(sql, (error, results) => {
            if (error != null) 
                reject(error);
            else resolve(results);
        })
    });
};
const destroy = () => database.destroy();

module.exports = {
    connection, query, destroy
};
