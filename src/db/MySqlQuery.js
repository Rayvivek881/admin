require('dotenv').config();
const mysql = require('mysql')
var database;

const connection = async () => {
    database = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE
    });

    return new Promise((resolve, reject) => {
        database.connect((error, results) => {
            if (error != null) 
                reject(error);
            else resolve(results);
        })
    });
};

const query = async (sql) => {
    const result = await new Promise((resolve, reject) => {
        database.query(sql, (error, results) => {
            if (error != null) 
                reject(error);
            else resolve(results);
        })
    });
    return result;
};
const destroy = () => database.destroy();

module.exports = {
    connection, query, destroy
};
