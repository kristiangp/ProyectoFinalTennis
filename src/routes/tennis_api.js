const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

// Módulos internos
const { readFile, writeFile } = require('../files');

const FILE_NAME = './db/tennis.txt';

// Rutas de la API
// API
// Listar Mascotas
router.get('/', (req, res)=>{
    let tennis = readFile(FILE_NAME);

    const {search} = req.query;
    if(search){
        tennis = tennis.filter(pet => tenni.title.toLowerCase().includes(search.toLowerCase()));
    }

    res.json(tennis);
})

//Crear Mascota
router.post('/', (req, res) => {
    try {
        //Leer el archivo de mascotas
        const data = readFile(FILE_NAME);
        //Agregar la nueva mascota (Agregar ID)
        const newtenni = req.body;
        newtenni.id = uuidv4();
        console.log(newtenni)
        data.push(newtenni);
        // Escribir en el archivo
        writeFile(FILE_NAME, data);
        res.json({ message: 'el libro fue creado con éxito' });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al almacenar el libro' });
    }
});

//Obtener una sola mascota
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    //Guardar el ID
    const id = req.params.id
    //Leer el contenido del archivo
    const tennis = readFile(FILE_NAME)
    // Buscar la mascota con el ID que recibimos
    const tenniFound = tennis.find(tenni => tenni.id === id )
    if(!tenniFound){// Si no se encuentra la mascota con ese ID
        res.status(404).json({'ok': false, message:"tenni not found"})
        return;
    }
    res.json({'ok': true, tenni: tenniFound});
})

//Actualizar una mascota
router.put('/:id', (req, res) => {
    console.log(req.params.id);
    //Guardar el ID
    const id = req.params.id
    //Leer el contenido del archivo
    const tennis = readFile(FILE_NAME)
    // Buscar la mascota con el ID que recibimos
    const tenniIndex = tennis.findIndex(tenni => tenni.id === id )
    if( tenniIndex < 0 ){// Si no se encuentra la mascota con ese ID
        res.status(404).json({'ok': false, message:"tenni not found"});
        return;
    }
    let tenni = tennis[tenniIndex]; //Sacar del arreglo
    tenni = { ...pet, ...req.body  };
    tennis[tenniIndex] = tenni; //Poner la mascota en el mismo lugar
    writeFile(FILE_NAME, tennis);
    //Si la mascota existe, modificar sus datos y almacenarlo nuevamente
    res.json({'ok': true, tenni: tenni});
})

//Eliminar una mascota
router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    //Guardar el ID
    const id = req.params.id
    //Leer el contenido del archivo
    const tennis = readFile(FILE_NAME)
    // Buscar la mascota con el ID que recibimos
    const tenniFound = tennis.findIndex(tenni => tenni.id === id )
    if( tenniIndex < 0 ){// Si no se encuentra la mascota con ese ID
        res.status(404).json({'ok': false, message:"tenni not found"});
        return;
    }
    //Eliminar la mascota que esté en la posición petIndex
    pets.splice(petIndex, 1);
    writeFile(FILE_NAME, tennis)
    res.json({'ok': true});
})


module.exports = router;