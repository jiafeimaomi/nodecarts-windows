var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb://127.0.0.1:27017/lp") //连接数据库

app.set( 'view engine', 'html' );
app.engine( 'html', require( 'ejs' ).__express );
// console.log('__dirname', __dirname, require('path').join(__dirname, 'views'))
app.set('views', require('path').join(__dirname, 'public'));

app.use(express.static(require('path').join(__dirname, 'public')));


// app.use(multer());
app.use(cookieParser('sessiontest'))
app.use(session({
  secret: 'sessiontest',
  cookie: {
    maxAge: 1000* 60 * 30
  },
  resave: true,
  saveUninitialized: true
}))


require('./routes')(app);

app.listen(8090);