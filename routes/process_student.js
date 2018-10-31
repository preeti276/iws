var express = require('express');
var router = express.Router();

var path = require('path');
var url = require('url');
var fs = require('fs');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'preetisethi0@gmail.com',
    pass: 'siddhant'
  }
});

router.get('/', function(req, res) {
  var q = url.parse(req.url, true);
  var qdata = q.query;
  var fname = qdata.fname;
  var lname = qdata.lname;
  var name = fname+lname+'.json';
  var filepath = path.join(__dirname,'..','files',name);

  fs.readFile(filepath, function (err, data) {
    if (err) {
      //throw err;
      fs.open(filepath,'w', function(err,data){
        if(err){

          var mailOptions1 = {
            from: 'preetisethi0@gmail.com',
            to: qdata.email,
            subject: 'Registeration at SNU sports league',
            text: 'Kindly register again.Your current registeration was unsuccessful due to following errors: '+err
          };
          
          transporter.sendMail(mailOptions1, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.send("An error occured, check email sent to: "+data.email);
         // res.sendFile((path.join(__dirname+'/../views/q2.html')));
        }
        var arr = [];
        arr.push(qdata);
        var obj = {};
        obj["students"] = arr;
        fs.writeFile(filepath, JSON.stringify(obj), function(err){
          if(err) throw err;
        })
        //res.send("File created and email sent to "+qdata.email);
        res.sendFile((path.join(__dirname+'/../views/q2.html')));
        var mailOptions = {
          from: 'preetisethi0@gmail.com',
          to: qdata.email,
          subject: 'Registeration at SNU sports league',
          text: 'Congratulations! You have been successfully registered at SNU Sports league. Following are your registeration details: '+JSON.stringify(qdata)
        };
      
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      })
    }

    else{
      var json = JSON.parse(data); 
      var arr = [];
      arr.push(json);
      arr.push(qdata);
      var obj = {};
      obj["students"] = arr;
      fs.writeFile(filepath, JSON.stringify(obj))
      console.log('Updated!');
    
     // res.send("File created and email sent to "+qdata.email);
     res.sendFile((path.join(__dirname+'/../views/q2.html')));
      var mailOptions = {
        from: 'preetisethi0@gmail.com',
        to: qdata.email,
        subject: 'Registeration at SNU sports league',
        text: 'Congratulations! You have been successfully registered at SNU Sports league. Following are your registeration details: '+data
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  });
});

module.exports = router;
