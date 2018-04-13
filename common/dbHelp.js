var mongoose = require('mongoose'),
    Schema = mongoose.Schema,   
    models = require('./models');
 
for(var m in models) {
    mongoose.model(m, new Schema(models[m])); //由Schema构造生成的模型，具有数据库操作的行为。
}
module.exports = {
    getModel: function (type) {
        return _getModel(type);
    }
};
var _getModel = function (type) {
    return mongoose.model(type);
};