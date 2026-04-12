const express = require("express");
require('dotenv').config(); // .env

const rutas = require("./routes/index");

// Inicializar una app express
const app = express();

const PORT = process.env.PORT || 3000;

// JSON 
app.use(express.json());

app.get("/", function(req, res){
    return res.json({mensaje: "Hola saludos desde mi API"});
});

// habilitar rutas
app.use("/api", rutas);

app.listen(PORT, function(){
    console.log("Servicdor corriendo en el puerto: "+PORT);
});