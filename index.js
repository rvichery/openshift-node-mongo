
var express = require('express');
var mongoose = require('mongoose');

var uri = process.env.MONGO_URL;
global.db = mongoose.createConnection(uri, { mongos:true });

var app = express();

app.listen(8000, function() {
  console.log('listening on http://localhost:8000');
});
