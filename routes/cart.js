// app：express对象
global.dbHelper = require('../common/dbHelp.js')
module.exports = function ( app ) {
    app.get('/getCart', function (req, res) {
      var Cart = global.dbHelper.getModel('cart');
      Cart.find({}, function (error, docs) {
      //   console.log('doc', doc)
        if (docs && docs.length) {
            res.send({
                code: 200,
                data: docs,
                msg: '获取购物车商品成功！'
            });
        } else {
          res.send({
            code: 0,
            msg: '购物车暂无数据！'
        });
        }
      });
  });

  app.post('/addCart', function (req, res) {
    var Cart = global.dbHelper.getModel('cart');
    // console.log('req------', req.body, typeof req.body)
    let param = req.body;
    // console.log('param', param)
    Cart.create({
      uId: param.uId,
      cName: param.name,
      cPrice: param.price,
      cQuantity: 1
    }, function(error, doc){
      // console.log('doc------', doc)
      if(doc){
        res.send({
          code: 200,
          msg: "添加购物车成功！"
        })
      }else{
        res.send({
          code: 0,
          msg: "添加购物车失败！"
        })
      }
    })
  });
  app.post('/delCart', function (req, res) {
    var Cart = global.dbHelper.getModel('cart');
    console.log('---', req.body)
    Cart.remove({
      _id: req.body.cId
    }, function(error, doc){
      console.log('doc------', doc)
      if(doc){
        res.send({
          code: 200,
          msg: "购物车移除商品成功！"
        })
      }else{
        res.send({
          code: 0,
          msg: "购物车移除商品失败！"
        })
      }
    })
  });
}