// app：express对象
module.exports = function ( app, dbHelper ) {
    app.get('/getCart', function (req, res) {
      var Cart = dbHelper.getModel('cart');
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
    let param = req.body;
    // console.log('param', param);
    Cart.findOne({cName: param.name}, function(error, doc){
      // console.log('购物车', doc)
      if(doc){
        //如果购物车中已存在此商品，则将数量加1
        Cart.update({_id: doc._id}, {$set: {cQuantity: +doc.cQuantity+1, cStatus: false}}, function(error, doc){
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
      }else{
        Cart.create({
          uId: param.uId,
          cName: param.name,
          cPrice: param.price,
          cQuantity: 1
        }, function(error, doc){
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
      }
    })
    
  });
  app.post('/delCart', function (req, res) {
    var Cart = global.dbHelper.getModel('cart');
    // console.log('---', req.body)
    Cart.remove({
      _id: req.body.cId
    }, function(error, doc){
      // console.log('doc------', doc)
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

  app.post('/settle', function (req, res) {
    var Cart = global.dbHelper.getModel('cart');
    var carts = req.body.cart;
    carts.map((item, key)=>{
      // console.log('item', item);
      let updateSuccess = true;
      Cart.update({ _id: item.cId}, {$set : { cQuantity : item.num, cStatus:true }}, function(error, doc){
        if(!doc){
          updateSuccess = false;
        }
      })
      if(!updateSuccess){
        res.send({
          code: 0,
          msg: '结算失败！'
        })
      }else{
        res.send({
          code: 200,
          msg: '结算成功！'
        })
      }
    })
    Cart.update({
      _id: req.body.cId
    }, function(error, doc){
      // console.log('doc------', doc)
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