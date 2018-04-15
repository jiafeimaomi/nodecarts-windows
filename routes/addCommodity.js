// app：express对象
global.dbHelper = require('../common/dbHelp.js')
module.exports = function ( app ) {
    app.post('/addCommodity', function (req, res) {
        var Commodity = global.dbHelper.getModel('commodity');
        // console.log('req' ,req.body)
        var commodityname = req.body.commodityname;
        Commodity.findOne({name: commodityname}, function (error, doc) {
        //   console.log('doc', doc)
          if (doc) {
              res.send({
                  code: 0,
                  msg: '商品已经存在！'
              });
          } else {
            Commodity.create({
                name: commodityname,
                price: req.body.commodityprice
            }, function (error, doc) {
                // console.log('doc', doc)
                if(doc._id){
                    req.session.msg = '商品添加成功！';
                    res.send({
                        code: 200,
                        msg: '商品添加成功！'
                    });
                }else{
                    req.session.msg = '商品添加失败！';
                    res.send({
                        code: 0,
                        msg: '商品添加失败！'
                    }); 
                }
            });
          }
        });
    });
}