const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD, {
    host: process.env.BD_HOST,
    dialect: 'mysql'
});

async function testConexion(){
    try {
        await sequelize.authenticate();
        console.log('CONEXION CON BD CORRECTA.');
      } catch (error) {
        console.error('ERROR DE CONEXION:', error);
      }
}

testConexion();

module.exports = sequelize;