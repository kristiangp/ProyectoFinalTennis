const{Model,DataTypes}=require('sequelize');
const TENNI_TABLE='tennis';
const tenniSchema={
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    talla: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    stock: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    fechaLanzamiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isAvailable:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imageURL:{
        type: DataTypes.STRING,
        allowNull: false
    }
};
class tenniModel extends Model{
    static associate(models){

    }
        static config(sequelize){
            return{
                sequelize,
                modelName:'tenni',
                tableName:TENNI_TABLE,
                timestamps:false
            }
        }
    }     
    module.exports={tenniModel,tenniSchema,TENNI_TABLE};       
