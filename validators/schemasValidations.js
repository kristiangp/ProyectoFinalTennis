const  Joi  = require('joi');


const tennisSchema = Joi.object({
    color: Joi.string().required(),
    talla: Joi.number().required(),
    tipo: Joi.string().valid('Casual', 'Sport', 'Elegante', 'Estudio', 'Informal').required(),
    marca: Joi.string().required(),
    precio: Joi.number().required(),
    disponible: Joi.boolean().required(),
    stock: Joi.number().required(),
    fechaLanzamiento: Joi.date().iso().required(), // Si la fecha de lanzamiento es un campo de fecha
    imageURL: Joi.string().uri().required(), // Si imageURL es una URL
    isAvailable: Joi.string().required(), 
    // Agrega más validaciones según los campos adicionales que puedas tener
});
const pedidoSchema = Joi.object({
    id: Joi.number().integer().positive(), // Puedes ajustar las restricciones según tus necesidades
    documento: Joi.string().required(),
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    direccion: Joi.string().required(),
    telefono: Joi.string().required(),
    total: Joi.number().allow(null), // Permitir valores nulos
    productos: Joi.array().items(Joi.object()), // Validar una matriz de objetos, ajusta según la estructura de tus productos
    // Puedes agregar más validaciones si es necesario
});

module.exports = { tennisSchema, pedidoSchema };
