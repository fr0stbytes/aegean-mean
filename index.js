const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const config = require('./config/database');

// Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

// Provide static directory for frontend
app.use(express.static(__dirname + '/client/dist/'));

app.get('*', (req, res) => {
  res.send ('Hello world');
});

app.listen(8080, () =>{
  console.log('Listening on 8080')
});
