const { Model, DataTypes } = require("sequelize");

const PEDIDO_TABLE = "pedidos";

const pedidoSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    documento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    productos: {
        type: DataTypes.JSON, // O ajusta este tipo según la estructura de tus productos
        allowNull: true,
    },
};

class PedidoModel extends Model {
    static associate(models) {
        //this.belongsToMany(models.Producto, { through: 'DetallePedido' });
        
        // Define asociaciones si es necesario
    }
    static config(sequelize) {
        return {
            sequelize,
            modelName: "Pedido",
            tableName: PEDIDO_TABLE,
            timestamps: false,
        };
    }
}

module.exports = { PedidoModel, pedidoSchema, PEDIDO_TABLE };