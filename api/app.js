let express = require('express');
let cors = require("cors");
let catalogRoute = require('./routes/CatalogRoute');
let path = require('path');

let app = express();

require('./DBconnection')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', catalogRoute);

app.use('*', (req, res) => {
  res.status(404).send("Url Not Found");
})

module.exports = app;