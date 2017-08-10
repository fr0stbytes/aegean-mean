const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const authentication = require('./routes/authentication');

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

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Provide static directory for frontend
app.use(express.static(__dirname + '/client/dist/'));

app.use('/authentication', authentication);

app.get('*', (req, res) => {
  res.send ('Hello world');
});

app.listen(8080, () =>{
  console.log('Listening on 8080')
});
