// app：express对象
global.dbHelper = require('../common/dbHelp.js')
module.exports = function ( app ) {
    app.get('/register', function(req, res) {
        // res.render('register.html');
        console.log('===req.session===get', req.session);
        console.log('进入注册页面')
    });
    app.post('/register', function (req, res) {
        var User = global.dbHelper.getModel('user'),
            uname = req.body.username;
        // console.log('User', User)
        // console.log('uname', uname)
        // console.log('req.body', req.body, req.session)
        User.findOne({name: uname}, function (error, doc) {
            // console.log('doc', doc)
            if (doc) {
                req.session.error = '用户名已存在！';
                res.send({
                    code: 0,
                    msg: '用户名已存在！'
                });
            } else {
                User.create({
                    name: uname,
                    password: req.body.password
                }, function (error, doc) {
                    // console.log('doc', doc)
                    if(doc._id){
                        req.session.msg = '用户名创建成功！';
                        res.send({
                            code: 200,
                            msg: '用户名创建成功！'
                        });
                    }else{
                        req.session.msg = '用户名创建失败！';
                        res.send({
                            code: 0,
                            msg: '用户名创建失败！'
                        }); 
                    }
                });
            }
            console.log('===req.session===post', req.session);
        });
    });
}