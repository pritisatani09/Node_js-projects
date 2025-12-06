require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router/index.route');
const database = require('./config/dbConnection');
const PORT = process.env.PORT || 8000;
database();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', require('./router/index.route'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))  