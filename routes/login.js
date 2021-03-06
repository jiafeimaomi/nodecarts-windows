// app：express对象
module.exports = function ( app, dbHelper ) {
    console.log('===dbHelper===', dbHelper)
    app.get('/login', function(req, res) {
        // res.render('register.html');
        console.log('进入登陆页面')
    });
    app.post('/login', function (req, res) {
        var User = dbHelper.getModel('user'),
            uname = req.body.username,
            upass = req.body.password;
        // console.log('req.body', req.body)
        User.findOne({name: uname}, function (error, doc) {
            if(doc){
                User.findOne({name: uname, password: upass}, function(error, doc){
                    console.log('doc', doc)
                    if (doc) {
                        req.session.user = doc;
                        res.send({
                            code: 200,
                            msg: '用户登陆成功！'
                        });
                    } else {
                        res.send({
                            code: 0,
                            type: 2,
                            msg: '密码错误！'
                        })
                    }
                })
            }else{
                res.send({
                    code: 0,
                    type: 1, //type为1表示用户名不存在，2表示密码错误
                    msg: '用户名不存在！'
                })
            }
        });
    });
}