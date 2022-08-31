const mysql = require('mysql');
const { query } = require('../db/MySqlQuery.js')
const createUser = async (req, res) => {
    try {
        const { name, email, mobile, message } = req.body;

        let sql = `SELECT * FROM User WHERE mobile = '${mobile}'`;
        if ((await query(sql)).length != 0)
            return res.status(400).json({msg : "moblie is already resistered"})

        sql = `INSERT INTO User (name, email, message, mobile)
                VALUES ('${name}', '${email}', '${message}', '${mobile}')`;
        await query(sql);
        res.status(200).json({msg : "data successfully created"});

    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

const getUser = async (req, res) => {
    try {
        let sql = `SELECT * FROM User`
        const result = await query(sql);
        res.status(200).json({users : [...result]});
    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

const deleteUser = async (req, res) => {
    try {
        const { mobile }  = req.body;
        let sql = `SELECT * FROM User WHERE mobile = '${mobile}'`;
        if ((await query(sql)).length == 0)
            return res.status(400).json({msg : "user not find"})

        sql = `DELETE FROM User WHERE mobile = ${mobile}`;
        await query(sql);
        res.status(200).json({msg : "data successfully deleted"});

    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

module.exports = {
    createUser, getUser, deleteUser
}