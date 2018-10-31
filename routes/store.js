var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs("mongodb://ps585:SNUcse276@ds123173.mlab.com:23173/iws", ['student_info']);

var url = require('url');

router.get('/', function(req, res){
    var q = url.parse(req.url, true);
    var qdata = q.query;
    db.student_info.save(qdata, function(err, qdata){
        if(err){
            res.send(err);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("Your data has been saved to database. Try to retrieve it from database.");
        res.write('<br><a href = "http://localhost:3000/form4">Link to get data from database</a>');
        console.log('added!');
    });
});

router.get('/find', function(req, res){
    var q = url.parse(req.url, true);
    var qdata = q.query;
    var firstname = qdata.fname;
    var lastname = qdata.lname;
    var query = {fname: firstname , lname : lastname};
    res.writeHead(200, {'Content-Type': 'text/html'});
    db.student_info.find(query).toArray(function(err, result){
        if(err){
            throw err;
        }
        res.write("Data matching your query: <br>");
        res.write(JSON.stringify(result));
        res.write("<br><br>Proceed to adding to database automatically from existing files.");
        res.write('<br><a href = "http://localhost:3000/q4"> Link to Question 4</a>');
    });
});

module.exports = router;