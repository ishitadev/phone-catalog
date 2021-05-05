var express = require('express');
var cors = require("cors");
var catalogRoute = require('./routes/CatalogRoute');
var path = require('path');

var app = express();

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