const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./routes');

app.use(cors());
app.use(bodyParser.json());  
app.use(router);

module.exports = app;