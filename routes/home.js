// app：express对象
module.exports = function ( app, dbHelper ) {
    app.get('/getCommodity', function (req, res) {
        var Commodity = dbHelper.getModel('commodity');
        // console.log('req.session----home', req.session)
        if(req.session.user){
            Commodity.find({}, function (error, docs) {
              if (docs && docs.length) {
                  res.send({
                      code: 200,
                      data: docs,
                      uId: req.session.user._id,
                      msg: '获取商品信息成功！'
                  });
              } else {
                res.send({
                  code: 0,
                  msg: '获取商品信息失败'
                })
              }
            });
        }else{
          res.send({
            code: 0,
            msg: '您未登陆，请先登陆！'
          })
        }
    });
}