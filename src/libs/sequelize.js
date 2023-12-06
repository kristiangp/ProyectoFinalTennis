const {Sequelize} = require('sequelize');
const setUpModels = require('../../db/models');


const sequelize = new Sequelize('tennis', 'postgres', '12980565', {
    host:'localhost',
    dialect:'postgres',
    logging:true,
    port:5432
});

setUpModels(sequelize);

//Sincronizar. OJO CON ENTORNOS PRODUCTIVOS
sequelize.sync();

module.exports = sequelize;