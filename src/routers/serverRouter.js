const express = require('express');
const serverController = require("../controllers/serverController"); // Asegúrate de que esta ruta sea correcta

class ServerRouter {
    constructor() {
        this.router = express.Router();
     
        this.objServerC = new serverController.default();
        this.config(); 
    }

    config() {
        
        this.router.get("/users", this.objServerC.getAllUsers);
        this.router.get("/users/:id", this.objServerC.getUsers);
        this.router.post("/users", this.objServerC.register);
        this.router.put("/users/:id", this.objServerC.update);
        this.router.delete("/users/:id", this.objServerC.deleteUser);

        this.router.get("/api/users/search", this.objServerC.searchUsers);
    }


    getRouter() {
        return this.router;
    }
}

exports.default = ServerRouter;

/*const express = require('express');
const serverController = require("../controllers/serverController");

class ServerRouter{
    constructor(){
        this.router = express.Router();
        this.config();
    }

    config(){

        // los onbjetos se nombran con obj el .default porque es exports.default
        // en serveercontroller tiene un metodo que se llama getAllUsers por eso se llama
        const objServerC = new serverController.default();
        this.router.get("/users", objServerC.getAllUsers);
        // get obtiene, el post para insertar, el put para actualizar y el delete para eliminar
        this.router.get("/users/:id", objServerC.getUsers);
        // this.router.post("/users", objServerC.register);
        // this.router.put("/users/:id", objServerC.update);
        // this.router.delete("/users/:id", objServerC.deleteUser);

    }
}

exports.default = ServerRouter;
// siempre exportar el default con el nombre de la clase
*/