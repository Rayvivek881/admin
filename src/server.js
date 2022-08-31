require('dotenv').config();
const express = require('express');
const app = express(), PORT = process.env.PORT || 8080;
const cors = require('cors'), mysql = require('mysql');
const { connection } = require('./db/MySqlQuery.js')

// database connection
connection().then((result) => console.log("database connection successful........"))
    .catch((err) => console.log("database not connected", err));


//middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());


// Routers
app.use('/api/user', require('./routes/user.js'));
app.use('/admin', require('./routes/admin.js'));


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));