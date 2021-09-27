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
        var values = [userData.id, userData.Name, userData.Address, userData.Phone]
        this.connection.query(sql, [values], function(err, result) {
            if (err) throw err;
            var user = JSON.stringify(result);
            callback(user);
            console.log("Number of records inserted: " + result.affectedRows)
        })
    }
    findUserByName(name, callback) {
        var sql = "SELECT * FROM users WHERE Name = " + name;
        this.connection.query(sql, function(err, result) {
            if (err) throw err;
            var user = JSON.stringify(result);
            console.log("user: " + user);
            return callback(user);
        })
    }
    updateUseByName(name, newObj, calback) {

        var sql = "UPDATE users SET " + "Name =" + JSON.stringify(newObj.Name) + ", Address =" + JSON.stringify(newObj.Address) + ", Phone =" + JSON.stringify(newObj.Phone) + "WHERE Name = " + name;
        console.log(newObj, 'novoobj', name)
        this.connection.query(sql, function(err, result) {
            if (err) throw err;
            var user = JSON.stringify(result);
            console.log('update:' + user);
            calback(user);
        })
    }
    deleteUseByName(name, callback) {
        var sql = "DELETE FROM users WHERE Name =" + name;
        this.connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log(result);
            callback(result);
        })
    }
}
module.exports = { Db }