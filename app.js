var express = require('express'); //与http对应的第三方核心模块，用于处理http请求
var bodyParser = require('body-parser'); //拦截和解析所有的请求
var multer = require('multer');
var session = require('express-session'); //保存session的中间件
var mongoose = require('mongoose');
var app = express();


//经过看源代码下面的说明知道了body-parser的三种用法：
//在讲用法之间，我们需要弄清楚下面四个不同的处理方法：这四个处理方法分别对body的内容采用不同的处理方法；
//分别是处理json数据、Buffer流数据、文本数据、UTF-8的编码的数据。
//bodyParser.json(options)、bodyParser.raw(options)、bodyParser.text(options)、bodyParser.urlencoded(options)
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb://127.0.0.1:27017/lp") //连接数据库

app.set( 'view engine', 'html' ); //设置视图引擎，保存后重启服务，即可访问html文件
app.engine( 'html', require( 'ejs' ).__express );
// console.log('__dirname', __dirname, require('path').join(__dirname, 'views'))
app.set('views', require('path').join(__dirname, 'public'));

app.use(express.static(require('path').join(__dirname, 'public'))); //设置静态文件存放地址

// app.use(multer());
app.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 1000* 60 * 30
  },
  resave: true,
  saveUninitialized: true
}))
global.dbHelper = require('./common/dbHelp.js') //引入公共方法  compiling our schema into a Model
require('./routes')(app, global.dbHelper);

app.listen(8090);