const jwt = require('jsonwebtoken');
const encryption = require('../middleware/encryption.js');
const crypto = require('crypto')
const { query } = require('../db/MySqlQuery.js')
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
        if (result.length == 0)
            return res.status(400).json({msg : "username is not found"});

        if (encryption(password) != result[0].password)
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
        const { title, location, tag, exp_level, link } = req.body;
        const newid = crypto.randomBytes(10).toString('hex');

        let sql = `INSERT INTO Jobs (title, location, tag, exp_level, link, id)
            VALUES ('${title}', '${location}', '${tag}', '${exp_level}', '${link}', '${toString(newid)}')`;
        await query(sql);

        res.status(200).json({msg : "new Job got inserted"});
    } catch (err) {
        console.log(err);
        res.status(400).json({msg : "we got some error"});
    }
}
 /**
  * 
  * @param {*} req 
  * @param {*} res 
  * @returns 
  */
const deleteJob = async (req, res) => {
    try {
        const { id } = req.query;
        let sql = `SELECT id FROM Jobs WHERE id = '${id}'`;
        const result = await query(sql);

        if (result.length == 0)
            return res.status(400).json({msg : "data not found"});

        sql = `DELETE FROM Jobs WHERE id = '${id}'`;
        await query(sql);

        res.status(200).json({msg : "Job got deleted"});
    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

const getJobs = async (req, res) => {
    try {
        const {page_no, max_len, tag} = req.query;
        let sql = `SELECT * FROM Jobs LIMIT ${max_len} OFFSET ${(page_no - 1) * max_len} WHERE tag = '${tag}'`;
        if (tag == undefined) {
            sql = `SELECT * FROM Jobs LIMIT ${max_len} OFFSET ${(page_no - 1) * max_len}`;
        }
        const result = await query(sql);
        res.status(200).json([...result]);
    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

module.exports = {
    createAdmin, AdminLogin, insertJob, deleteJob, getJobs
}