const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_TOKEN;
const { query } = require('../db/MySqlQuery.js')

const authentication = async (req, res, next) => {
    const token = req.header("x-access-token") || req.body.token || req.query.token;
    if (!token) {
        return res.status(401)
            .json({ error: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        let sql = `SELECT username FROM Admin WHERE username = '${decoded.username}'`;
        req.user = (await query(sql))[0];
        next();
    } catch (err) {
        res.status(401).json({ error: "Token is not valid" });
    }
}

module.exports = authentication;