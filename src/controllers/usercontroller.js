const mysql = require('mysql');
const createUser = async (req, res) => {
    try {
        const { name, email, mobile, message } = req.body;
        let sql = `INSERT INTO User (name, email, message, mobile)
                VALUES ('${name}', '${email}', '${message}', '${mobile}')`
        database.query(sql, function (err) {
            if (err != null)
                return res.status(400).json({msg : "we got some error", ...err});
            res.status(200).json({msg : "data successfully created"});
        });
    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

const getUser = async (req, res) => {
    try {
        let sql = `SELECT * FROM User`
        database.query(sql, function (err, results) {
            if (err != null)
                return res.status(400).json({msg : "we got some error", ...err});
            res.status(200).json({users : [...results]});
        });
    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

const deleteUser = async (req, res) => {
    try {
        const { mobile }  = req.body;
        let sql = `DELETE FROM User WHERE mobile = ${mobile}`;
        database.query(sql, function (err) {
            if (err != null)
                return res.status(400).json({msg : "we got some error", ...err});
            res.status(200).json({msg : "data successfully deleted"});
        });
    } catch (err) {
        res.status(400).json({msg : "we got some error", ...err});
    }
}

module.exports = {
    createUser, getUser, deleteUser
}