
//Router
const { Router } = require('express');

//Importación de funciones del controlador 
const { usuariosGetHub,
        usuariosPostHub,
        usuariosPutHub,
        usuariosDeleteHub } = require('../controller/usuarios_controller');

//Router para peticiones http
const router = Router();

        //GET: Buscar usuarios de la DB
        router.get('/', usuariosGetHub)

        //PUT: Actualizar usuarios de la DB
        router.put('/:id',usuariosPutHub)

        //POST: Crear usuarios en la DB
        router.post('/',usuariosPostHub)   

        //DELETE: Eliminar usuarios de la DB
        router.delete('/:id',usuariosDeleteHub)

//Exportar router con las modificaciones previamente hechas 
module.exports = router;