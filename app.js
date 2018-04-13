var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb://127.0.0.1:27017/lp")
// app.get('/', function(req, res){
//   console.log('==enter==0000')
//   res.render('register.html');
// })

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

app.use(function(req, res, next){
  console.log('req.session----aapp', req.session.user)
  // console.log('res----app', res)
  // res.locals.user = req.session.user; //保存用户信息
  // var err = req.session.error;  //保存结果响应信息
  // res.locals.message = '';  // 保存html标签
  // if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
  next();
});


require('./routes')(app);

app.listen(8090);