const express = require('express');
const router = express.Router();
const { models } = require('../libs/sequelize');
const { tennisSchema } = require('../../validators/schemasValidations');

router.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/signin');
    }
});
 
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let tennis = [];

        if (search) {
            tennis = await models.tenni.findAll({
                where: {
                    tipo: search // Filtrar por el campo 'tipo'
                }
            });
        } else {
            tennis = await models.tenni.findAll();
        }

        // Agrupar productos por categoría (tipo)
        const groupedTennis = tennis.reduce((acc, curr) => {
            const key = curr.tipo;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(curr);
            return acc;
        }, {});

        res.render('tennis/index', { tennis: groupedTennis, search });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al obtener los productos' });
    }
});


router.get('/create', (req, res) => {
    res.render('tennis/create');
});

// router.post('/', async (req, res) => {
//     try {
//         console.log(req.body);
//         const { error } = tennisSchema.validate(req.body);
//         if (error) {
//             return res.status(400).json({ message: error.details[0].message });
//         }

//         const newTenni = await models.tenni.create(req.body);
//         res.redirect('/tennis');
//     } catch (error) {
//         console.error(error);
//         res.json({ message: 'Error al almacenar el tenni' });
//     }
// });
const Joi = require('joi');

// ... otras rutas ...

// Ruta para crear un producto tennis
router.post('/', async (req, res) => {
    try {
        // Validar los datos del formulario utilizando Joi
        const { error } = tennisSchema.validate(req.body);
        if (error) {
        return res.status(400).json({ message: error.details[0].message });
        }


        // Crear un nuevo producto tennis utilizando los datos validados
        const newTenni = await models.tenni.create(req.body);

        res.redirect('/tennis');
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al almacenar el tenni' });
    }
});



router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await models.tenni.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/tennis');
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al eliminar el tenni' });
    }
});

// Nueva ruta para la actualización del tenni
router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tenni = await models.tenni.findByPk(id);

        if (!tenni) {
            return res.json({ message: 'El tenni no existe' });
        }

        res.render('tennis/edit', { tennis: tenni }); // Pasar el producto a la vista
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al obtener el tenni para editar' });
    }
});

// Ruta para actualizar el tenni
router.post('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body; // Datos actualizados del formulario

        // Buscar el tenni por su ID
        const tenni = await models.tenni.findByPk(id);

        if (!tenni) {
            return res.json({ message: 'El tenni no existe' });
        }

        // Actualizar los datos del tenni
        await tenni.update(updatedData);

        res.redirect('/tennis'); // Redirigir a la lista de productos después de la actualización
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al actualizar el tenni' });
    }
});



module.exports = router;