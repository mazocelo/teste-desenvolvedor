const mysql = require('mysql')
class Db {
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "1234",
            database: "mydb"
        });
        this.connect()
    }
    connect() {
        return this.connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        })
    }
    createUser(userData, callback) {
        var sql = "INSERT INTO users (ID, Name, Address, Phone) VALUES (?)";
        var values = [userData.id, userData.name, userData.address, userData.phone]
        this.connection.query(sql, [values], function(err, result) {
            if (err) throw err;
            var user = JSON.stringify(result);
            callback(user);
            console.log("Number of records inserted: " + result.affectedRows)
        })
    }
    findUser(id, callback) {
        var sql = "SELECT * FROM users WHERE ID = ";
        this.connection.query(sql + `'${id}'`, function(err, result) {
            if (err) throw err;
            var user = JSON.stringify(result);
            console.log("user: " + user);
            return callback(user);
        })
    }
    updateUser(id, newObj, calback) {
        var sql = "UPDATE users SET " + newObj + "WHERE" + id;
        this.connection.query(sql, function(err, result) {
            if (err) throw err;
            var user = JSON.stringify(result);
            console.log('update:' + user);
            calback(user);
        })
    }
    deleteUser(id, callback) {
        var sql = "DELETE FROM users ID = " + id;
        this.connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log(result);
            callback(result);
        })
    }
}
module.exports = { Db }