// app：express对象
global.dbHelper = require('../common/dbHelp.js')
module.exports = function ( app ) {
    app.get('/login', function(req, res) {
        // res.render('register.html');
        console.log('进入登陆页面')
    });
    app.post('/login', function (req, res) {
        var User = global.dbHelper.getModel('user'),
            uname = req.body.username,
            upass = req.body.password;
        // console.log('req.body', req.body)
        User.findOne({name: uname, password: upass}, function (error, doc) {
            console.log('doc', doc)
            if (doc) {
                req.session.user = doc;
                res.send({
                    code: 200,
                    msg: '用户登陆成功！'
                });
                // console.log('====req.session====', req.session)
            } else {
              res.send({
                code: 0,
                msg: '用户名或密码错误！'
              })
            }
        });
    });
}