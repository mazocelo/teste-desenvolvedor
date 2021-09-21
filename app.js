const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000
var path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//routering
app.get('/', (req, res) => {


    res.render('index')

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})