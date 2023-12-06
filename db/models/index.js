const { PedidoModel, pedidoSchema } = require('./pedido.model.js');
const {tenniModel, tenniSchema} = require('./tenni.model');
const {UserModel, userSchema} = require('./user.model');

function setUpModels(sequelize){
    PedidoModel.init(pedidoSchema, PedidoModel.config(sequelize));
    tenniModel.init(tenniSchema, tenniModel.config(sequelize));
    UserModel.init(userSchema, UserModel.config(sequelize));
}

module.exports = setUpModels;