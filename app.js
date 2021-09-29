const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000
var path = require('path');

const { Db } = require("./Model/DbDAO");
const { Utils } = require("./Model/util/Utils");
var db = new Db()
var Utility = new Utils()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
//routering
app.get('/', (req, res) => {
    res.render('index')
})
app.post('/', (req, res) => {
    var newUser = req.body
    newUser.id = Utility.newIdGenerator()
    console.log(newUser, 'aqui')
    db.createUser(newUser, (msg) => {
        res.send('Usuario criado!')
    })
})
app.get('/:name', (req, res) => {
    const name = req.params.name
    if (name != 'favicon.ico') {
        db.findUserByName(name, (user) => {
            res.send(user)
        })
    }
})
app.put('/:name', (req, res) => {
    const name = req.params.name
    var newData = req.body
    db.updateUseByName(name, newData, (msg) => {
        res.send(msg)
    })
})
app.delete('/:name', (req, res) => {
    const name = req.params.name
    db.deleteUseByName(name, (msg) => {
        res.send("users deletados:" + msg)
    })
})
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})