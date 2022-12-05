const mysql = require('mysql2');

const Connection = mysql.createConnection({
    user: process.env.ROOT,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports = Connection