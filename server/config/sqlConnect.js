const mysql = require('mysql');
const sqlDB =  require('./sqlURI');
const con = mysql.createConnection(sqlDB);

module.exports = con;
