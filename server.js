// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var multer = require('multer');
fs = require('fs');
var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '',
   database : 'documentloader'
 });

 connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 });

// This is different form http.createServer() or app.createServer()

// configuration ===========================================



// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users


var storage = multer.diskStorage({ //multers disk storage settings
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    var datetimestamp = Date.now();
    var fileName=file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
    cb(null, fileName);
  }
});



var upload = multer({ //multer settings
  storage: storage
}).single('file');


// routes ==================================================
require('./app/routes')(app, upload,fs,connection); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app
