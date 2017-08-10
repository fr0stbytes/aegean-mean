const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const authentication = require('./routes/authentication')(router); 

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

// Middleware
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(__dirname + '/client/dist/')); // Provide static directory for frontend
app.use('/authentication', authentication);

// Connect with angular 2 app
app.get('*', (req, res) => {
  res.send ('Hello world');
});

// Start the server
app.listen(8080, () =>{
  console.log('Listening on 8080')
});
