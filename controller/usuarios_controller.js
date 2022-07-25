
const {response, request} = require('express');

//Conexión con hubspot DB
const  hubspot  =  require ( '@hubspot/api-client' );
const  hubspotClient = new hubspot.Client({ developerApiKey: '0eb664bb-7420-466a-ac10-bfeb45a97d75'})

//Controlador petición GET para consultar usuarios
const usuariosGetHub = async(req = request, res = response) => {

    //Consulta a la DB
    const response1 = await hubspotClient.apiRequest({
        method: 'get',
        path: '/cms/v3/hubdb/tables/developer_test_4/rows/draft'

    })
    
    //json get
    const json1 = await response1.json()

    //resultados de interes del json
    const resultados = json1.results

    //data especifica que quiero enviar
    let data = [];

    //For para seleccionar solo los datos de interes necesarios
    for(let i = 0; i<resultados.length; i++){
        let objeto = resultados[i].values;
        objeto.id = resultados[i].id
        data.push(objeto)
    }

    //respuesta
    res.json({
        msg: 'get API - Successfully',
        data
    });

}

//Controlador petición POST para crear usuarios
const usuariosPostHub =  async (req = request, res) => {

    //Data que llega del front para la creación
    const {userFirstName, userLastName, userDocumentId} = req.body;

    //Creación del usuario en la DB
    const respuesta = hubspotClient.apiRequest({
        method: 'post',
        path: `/cms/v3/hubdb/tables/developer_test_4/rows`,
        //Valores para la creación del usuario
        body: { values:{
            name: userFirstName,
            last_name: userLastName,
            document_id: userDocumentId
            }
        }
    })

    //respuesta
    res.json({
        msg: 'post API - User added successfully',
    })
}

//Controlador petición PUT para actualizar usuarios
const usuariosPutHub =  async (req = request, res) => {

    //Data que llega del front para la actualización
    const {userFirstName, userLastName, userDocumentId} = req.body;
    //id del usuario a actualizar
    const {id} = req.params;

    //Actualización del usuario en la DB
    const respuesta = hubspotClient.apiRequest({
        method: 'put',
        path: `/cms/v3/hubdb/tables/developer_test_4/rows/${id}/draft`,
        //Valores para la actualización del usuario
        body: { values:{     
            name: userFirstName,
            last_name: userLastName,
            document_id: userDocumentId
            }
        }
    })

    //respuesta
    res.json({
        msg: 'put API - User updated successfully',
    })
}

//Controlador petición DELETE para eliminar usuarios
const usuariosDeleteHub =  async (req = request, res) => {

    //id del usuario a eliminar
    const {id} = req.params;

    //Eliminación del usuario en la DB
    const respuesta = hubspotClient.apiRequest({
        method: 'delete',
        path: `/cms/v3/hubdb/tables/developer_test_4/rows/${id}/draft`
    })

    //respuesta
    res.json({
        msg: 'delete API - User deleted successfully',
    })
}

//Exportar las constantes creadas de las peticiones HTTP para utilizarlas en /routes/usuarios.js
  module.exports = {
      usuariosGetHub,
      usuariosPostHub,
      usuariosPutHub,
      usuariosDeleteHub
  }