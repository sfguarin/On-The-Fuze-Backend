//Clase que me permite hacer mi webserver y llevarlo a un localhost, 
//lo hago como clase para que no quede tan saturado de información mi archivo de ejecución app.js

const express = require('express')

//Paquete cors que sirve para proteger nuestro servidor y restringir el acceso de sitios web
const cors = require('cors');

//Creación de clase que voy a exportar a app.js
class Server {

    constructor() {
        //definicion de variable app
        this.app = express();

        //definición de variable port, el puerto que voy a utilizar
        this.port = process.env.PORT;

        //Rutas para que los usuarios puedan acceder a mis interacciones get, post, put, delete
        this.paths = {

            usuarios:   '/api/usuarios'

        }

        //Middlewares: Servidor del contenido de la carpeta publica, restricción de sitios web
        this.middlewares();

        //subrutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // Cors - Permite proteger nuestro servidor 
        this.app.use( cors() );

        //lectura y parseo del body (postman)
        this.app.use( express.json() );

        //Directorio publico, para hacer uso del html que se ubica en la carpeta public (encargado del front)
        this.app.use( express.static('public') );
    }

    routes() {

        //funcion para llamar los endpoints puestos en ../routes/usuarios, con la dirección con la que yo quiero que 
        //se encuentren. this.app.use(url, ubicación donde se encuentra los endpoints. 
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));

          
    }

    //el listen lo ejecuto desde app.js
    listen() {

        this.app.listen(this.port, () => {

            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

}

module.exports = Server;