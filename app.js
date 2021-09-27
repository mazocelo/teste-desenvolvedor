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
    console.log(newUser)

    newUser.id = Utility.newIdGenerator()
    console.log(newUser, 'aqui')
    db.createUser(newUser, (user) => {
        res.send('registred:' + JSON.stringify(user))
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
    db.updateUseByName(name, newData, (user) => {
        res.send('user alterado:' + user)
    })
})
app.delete('/:name', (req, res) => {
    const name = req.params.name
    console.log(name)
    db.deleteUseByName(name, (user) => {
        res.send('user deletado:' + user)
    })
})
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})