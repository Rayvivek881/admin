const jwt = require('jsonwebtoken');
const encryption = require('../middleware/encryption.js');
const {query, connection} = require('./middleware/MySqlQuery.js')
const createAdmin = async (req, res) => {
    try {
        const { username, password, name } = req.body;
        let sql = `SELECT username FROM Admin WHERE username = '${username}'`;
        if ((await query(sql)).length != 0)
            return res.status(400).json({msg : "username is not unique"})

        sql = `INSERT INTO Admin (name, username, password)
                VALUES ('${name}', '${username}', '${encryption(password)}')`;
        await query(sql);
        const token = await jwt.sign({username : username}, process.env.JWT_TOKEN, {
            expiresIn: '3h',
        });
        res.status(200).json({msg : "Admin account created", token});

    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

const AdminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        let sql = `SELECT * FROM Admin WHERE username = '${username}'`;
        const result = await query(sql);
        if (result.length != 0)
            return res.status(400).json({msg : "username is not found"});
        if (encryption(password) != result.password)
            return res.status(400).json({msg : "wrong password"});
        const token = await jwt.sign({username : username}, process.env.JWT_TOKEN, {
            expiresIn: '3h',
        });
        res.status(200).json({token});
    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

const insertJob = async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

const deleteJob = async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

const getJobs = async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

module.exports = {
    createAdmin, AdminLogin, insertJob, deleteJob, getJobs
}