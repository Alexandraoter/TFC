const express = require('express');

const ServerRouter = require('./routers/serverRouter').default; // Importamos la clase ServerRouter

const mongoose = require('mongoose');

const database = require('./database/db'); // Asumo que database.db contiene la URL de tu DB

const cors = require('cors');

const path = require('path');

class Server {
    constructor() {
        this.app = express();
        this.app.set('port', process.env.PORT || 3000);

        this.conectarBD(); // Conecta a la BD al iniciar el servidor

        // Middlewares
        this.app.use(cors()); // Configuración de CORS 
        this.app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

       
        this.app.use(express.static(path.join(__dirname, '../'))); 

         
        const serverR = new ServerRouter();
      
        this.app.use('/', serverR.getRouter()); 

        
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../index.html')); // Envía el index.html
        });
        


        // Iniciar el servidor
        this.app.listen(this.app.get('port'), () => {
            console.log("Servidor corriendo por el puerto => ", this.app.get('port'));
            console.log(`Frontend accesible en: http://localhost:${this.app.get('port')}/`);
            console.log(`API endpoints: http://localhost:${this.app.get('port')}/api/...`); 
        });
    }

    conectarBD() {
        mongoose.connect(database.db).then(() => {
            console.log("Conexión a BD con éxito");
        }).catch((err) => {
            console.error("Error de conexión a la base de datos:", err);
        });
    }
}

const objServer = new Server();

