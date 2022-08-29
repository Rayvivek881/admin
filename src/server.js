require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 8080;

//middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));