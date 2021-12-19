const mysql = require('mysql');

module.exports = {
    getConnection : mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'unist',
        database:'my_db'
    })
}