

const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const {pedidoSchema} = require('../../validators/schemasValidations');
const Joi = require('joi');
// Módulos internos
const { readFile, writeFile } = require('../files');
const {models} = require('../libs/sequelize');

const FILE_NAME = './db/tennis.txt';

// router.get('/:id', (req, res) => {
//     console.log(req.params.id);
//     //Guardar el ID
//     const id = req.params.id
//     //Leer el contenido del archivo
//     const tennis = readFile(FILE_NAME)
//     // Buscar la mascota con el ID que recibimos
//     const tenniFound = tennis.find(tenni => tenni.id === id )
//     if(!tenniFound){// Si no se encuentra la mascota con ese ID
//         res.status(404).json({'ok': false, message:"tenni not found"})
//         return;
//     }
//     res.json({'ok': true, tenni: tenniFound});
// });

router.get('/', async (req, res) => {
    try {
        const products = await models.tenni.findAll({ where: { disponible: true } });
        const groupedProducts = products.reduce((acc, curr) => {
            const key = curr.tipo;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(curr);
            return acc;
        }, {});

        res.render('store/index', { tennis: groupedProducts });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al obtener los productos' });
    }
});

// ##########################         Rutas del carrito

router.get('/shopping-cart', (req, res) => {
    // Obtener productos seleccionados previamente (puedes almacenarlos en sesión)
    const selectedProducts = req.session.selectedProducts || [];

    res.render('store/shopping-cart', { selectedProducts });
});

// Ruta para mostrar el carrito de compras y el formulario de pedido
// Ruta para realizar un pedido
router.post('/place-order', async (req, res) => {
    try {
        // Validar los datos del formulario con Joi
        const { error } = pedidoSchema.validate(req.body);
        if (error) {
            // Si hay errores de validación, retornar un mensaje indicando los errores
            return res.status(400).json({ success: false, message: error.details.map(detail => detail.message) });
        }

        // Obtener datos del formulario
        const { documento, nombre, apellido, direccion, telefono } = req.body;
        const productos = req.session.selectedProducts || [];

        // Calcular el total de la compra
        const total = productos.reduce((acc, product) => acc + product.precio, 0);

        // Crear un nuevo pedido en la base de datos
        const newPedido = await models.Pedido.create({
            documento,
            nombre,
            apellido,
            direccion,
            telefono,
            total,
            productos,
        });
        console.log(newPedido);

        // Limpiar el carrito de compras en la sesión
        req.session.selectedProducts = [];

        // Redirigir o renderizar una página de confirmación
        res.redirect('/store');
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al realizar el pedido' });
    }
});


// Almacenamiento temporal en la sesión
router.post('/add-to-cart', (req, res) => {
    const productId = req.body.id;
    // Aquí obtén el producto correspondiente a productId de tu base de datos o de donde sea que los tengas almacenados
    const product = obtainProduct(productId);

    // Verifica si la sesión tiene un carrito, si no, crea uno vacío
    if (!req.session.cart) {
        req.session.cart = [];
    }

    // Agrega el producto al carrito en la sesión
    req.session.cart.push(product);
    res.redirect('/store');
});



// Ruta para manejar la solicitud de añadir al carrito
router.post('/add-to-cart/:tenniId', async (req, res) => {
    try {
        const tenniId = req.params.tenniId;
        // Lógica para obtener el producto por ID (puedes consultar tu base de datos)
        const tenni = await models.tenni.findByPk(tenniId);

        // Añadir el producto al carrito
        req.session.selectedProducts = req.session.selectedProducts || [];
        req.session.selectedProducts.push({
            id: tenni.id,
            tipo: tenni.tipo,
            precio: tenni.precio,
        });

        // Redirigir a la vista del carrito
        res.redirect('/store/shopping-cart');
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al añadir al carrito' });
    }
});

module.exports = router;