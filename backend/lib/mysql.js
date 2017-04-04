const mysql = require('mysql');

const obj = {
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'ir-mysql'
};

module.exports = mysql.createConnection(obj);
