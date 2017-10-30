
var express = require('express');
var mongoose = require('mongoose');
var async = require('async');
require('./person.js')();

var uri = process.env.MONGO_URL;
global.db = mongoose.createConnection(uri, { mongos:true });

var Person = mongoose.model('Person');

// define some dummy data
var data = [
  {
    name: 'bill',
    age: 25,
    birthday: new Date().setFullYear((new Date().getFullYear() - 25))
  },
  {
    name: 'mary',
    age: 30,
    birthday: new Date().setFullYear((new Date().getFullYear() - 30))
  },
  {
    name: 'bob',
    age: 21,
    birthday: new Date().setFullYear((new Date().getFullYear() - 21))
  },
  {
    name: 'lilly',
    age: 26,
    birthday: new Date().setFullYear((new Date().getFullYear() - 26))
  },
  {
    name: 'alucard',
    age: 1000,
    birthday: new Date().setFullYear((new Date().getFullYear() - 1000))
  }
];

var app = express();

app.listen(8000, function() {
  console.log('listening on http://localhost:8000');
});

async.each(data, function(item, cb) { 
    Person.create(item, cb);
}, function(err) {
    if (err) {
        // handle error
    }

    var prom = Person.find({age: {$lt: 1000}}).exec();

    prom.then(function(people) {
        console.log('young people: %s', people);
    })
});
