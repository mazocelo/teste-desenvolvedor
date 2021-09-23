const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000
var path = require('path');

const { Db } = require("./Model/db");
const { newIdGenerator } = require("./Model/util/idGenerator");
var db = new Db()


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//routering
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    var form = req.body
    var id = newIdGenerator()
    var user = { id, name: form['name'], address: form['adress'], phone: form['phone'] }
    console.log(user)
    db.createUser(user)
    res.end('registred:' + JSON.stringify(user))
})
app.get('/:id', (req, res) => {
    const id = req.params.id
    db.findUser(id, (user) => {
        console.log(user, 'aqui')
        res.end(user)
    })

})

app.put('/:id', (req, res) => {
    const id = req.params.id
    db.updateUser(id, )
})

app.delete('/:id', (req, res) => {

})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})