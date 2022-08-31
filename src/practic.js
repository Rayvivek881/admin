const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_TOKEN;
const decoded = jwt.verify("fuvk.you.deepak", JWT_TOKEN);
console.log(decoded);