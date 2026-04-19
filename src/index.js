const express = require("express");
require('dotenv').config(); // .env
var cors = require('cors')

const rutas = require("./routes/index");

const {sequelize} = require("./models");

// Inicializar una app express
const app = express();
app.use(cors())

const PORT = process.env.PORT || 3000;

// JSON 
app.use(express.json());

app.get("/", function(req, res){
    return res.json({mensaje: "Hola saludos desde mi API"});
});

// habilitar rutas
app.use("/api", rutas);


sequelize.sync({force: false}).then(() => {
    console.log("Base de datos Mysql Sincronizada");
}).catch(err => {
    console.log("Error al sincronizar la base de datos: ", err);
})

app.listen(PORT, function(){
    console.log("Servicdor corriendo en el puerto: "+PORT);
});