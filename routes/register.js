// app：express对象
module.exports = function ( app, dbHelper ) {
    app.get('/register', function(req, res) {
        console.log('进入注册页面')
    });
    app.post('/register', function (req, res) {
        var User = dbHelper.getModel('user'),
            uname = req.body.username;
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
        });
    });
}