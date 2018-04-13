// app：express对象
global.dbHelper = require('../common/dbHelp.js')
module.exports = function ( app ) {
    app.post('/getCommodity', function (req, res) {
        var Commodity = global.dbHelper.getModel('commodity');
        console.log('req.session--home', req.session.user)
        Commodity.find({}, function (error, docs) {
          console.log('docs', docs)
          if (doc) {
              res.send({
                  code: 200,
                  data: docs,
                  msg: '获取商品信息成功！'
              });
          } else {
            res.send({
              code: 0,
              msg: '获取商品信息失败'
            })
          }
        });
        // if(req.session.user){
        //     Commodity.find({}, function (error, docs) {
        //       console.log('docs', docs)
        //       if (doc) {
        //           res.send({
        //               code: 200,
        //               data: docs,
        //               msg: '获取商品信息成功！'
        //           });
        //       } else {
        //         res.send({
        //           code: 0,
        //           msg: '获取商品信息失败'
        //         })
        //       }
        //     });
        // }else{
        //   res.send({
        //     code: 0,
        //     msg: '您未登陆，请先登陆！'
        //   })
        //   // res.redirect('/login.html');
        // }
    });
}