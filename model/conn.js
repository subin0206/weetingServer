var mysql = require('mysql');
var db_config = require(__dirname + '/../config/database.js');
var con = db_config.db_info();

module.exports = {
    init: function () {
        return mysql.createConnection({
            host: con.host,
            port: con.port,
            user: con.user,
            password: con.password,
            database: con.database
        });
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}

