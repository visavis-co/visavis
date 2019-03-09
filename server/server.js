require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const db = require('./model/db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

/**
 * API - get
 */
app.get('/api/stuff', db.getStuff);


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/client', express.static(path.join(__dirname, '../client')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


app.listen(3000); //listens on port 3000 -> http://localhost:3000/

