var express = require('express');
var router = express.Router();

var url = require('url');
var fs = require('fs');
var path = require('path');
var directoryPath = path.join(__dirname+'/../files');
var dir = require('node-dir');

var mongojs = require('mongojs');
var db = mongojs("mongodb://ps585:SNUcse276@ds123173.mlab.com:23173/iws", ['student_info']);

router.get('/', function(req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
dir.readFiles(directoryPath,
    function(err, content, next) {
        if (err) throw err;
        console.log('content:', content);
        data = JSON.parse(content);
        db.student_info.save(data, function(err, data){
            if(err){
                res.send(err);
            }
            else{
                console.log('added!')
                //res.write(data);
            }
        });
        next();
    },
    function(err, files){
        if (err) throw err;
        console.log('finished reading files:', files);
    });
    res.write("<h4>Check your database to see the content added from existing files.</h4> ");
    res.write('<a href= "https://mlab.com/databases/iws/collections/student_info"> Link to database</a>');
    res.write('<br>'+'else '+'<br>'+'<a href= "http://localhost:3000/q5"> Proceed to Question 5</a>');
});


router.get('/upload', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true);
  var qdata = q.query;
  var file = qdata.filename;
  var filepath = path.join(directoryPath,file);
  fs.readFile(filepath, function (err, data) {
      console.log("file: "+file);
      if(err) throw err;
      console.log("data: "+data);
      var json = JSON.parse(data);
      db.student_info.save(json, function(err, json){
        if(err){
            res.send(err);
        }
        else{
            console.log('added!')
            res.write("Content add to database successfully!");
            res.write('<br><a href= "https://mlab.com/databases/iws/collections/student_info"> Link to database</a>');
            res.write('<br><br>'+'<h3><a href= "http://localhost:3000/form1"> Go back to Homepage</a></h3>');
        }
    });
  });
});

module.exports = router;
