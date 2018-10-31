var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var process_student = require('./routes/process_student');
var retrieve = require('./routes/retrieve');
var store = require('./routes/store');
var auto = require('./routes/auto');

// Create the Express application object
var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://ps585:SNUcse276@ds123173.mlab.com:23173/iws';
/*var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;*/
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'views')));

app.use('/process_student', process_student);
app.use('/retrieve', retrieve);
app.use('/store', store);
app.use('/auto', auto);

app.get('/', function(req,res){
  res.sendFile((path.join(__dirname+'/views/q1.html')));
})
app.get('/form1', function(req,res){
  res.sendFile((path.join(__dirname+'/views/form1.html')));
})
app.get('/form2', function(req,res){
  res.sendFile((path.join(__dirname+'/views/form2.html')));
})
app.get('/form3', function(req,res){
  res.sendFile((path.join(__dirname+'/views/form3.html')));
})
app.get('/form4', function(req,res){
  res.sendFile((path.join(__dirname+'/views/form4.html')));
})
app.get('/q4', function(req,res){
  res.sendFile((path.join(__dirname+'/views/q4.html')));
})
app.get('/q5', function(req,res){
  res.sendFile((path.join(__dirname+'/views/q5.html')));
})

app.listen(3000, function(err){
  if(err) 
    console.log(err);
})

module.exports = app;