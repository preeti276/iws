var express = require('express');
var router = express.Router();

var url = require('url');
var fs = require('fs');
var path = require('path');

// GET home page.
router.get('/', function(req, res) {
    var q = url.parse(req.url, true);
    var qdata = q.query;
    var fname = qdata.fname;
    var lname = qdata.lname;
    var rollno = qdata.rollnum;
    var name = fname+lname+'.json';
    var filepath = path.join(__dirname,'..','files',name);
    fs.readFile(filepath, function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        if(err){
            throw err;
        }
        var obj = JSON.parse(data);
        var i;
        var ans;
        var arr = obj.students;
        for(i = 0; i < arr.length; i++){
            var stu = arr[i];
            if(stu["rollnum"] == rollno){
                ans = JSON.stringify(arr[i]);
                break;
            }
        }
        res.write(ans);
        res.write('<br><br>')
        res.write('<h4> Above information is retrieved from file. Now proceed to storing data in database.</h4><br>')
        res.write('<a href = "http://localhost:3000/form3"> Link to question 3</a>');
        res.end();
      });
});

module.exports = router;
