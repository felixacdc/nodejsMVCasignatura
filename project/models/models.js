const path = require('path');

// Cargar Modelo ORM
const Sequelize = require('sequelize');

// Usar DDBB MySQL
var sequelize = new Sequelize('MVCExpress', 'homestead', 'secret', {
  host: '192.168.10.10',
  dialect: 'mysql'
});
/*var sequelize = new Sequelize('mysql://homestead:secret:33060/MVCExpress');*/

// Importa la definicion de la tabla Quiz en quiz.js
const Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exporta definicion de tabla Quizes

// squelize.sync crea e inicializa tabla de preguntas en DB
Quiz.sync().then(function() {
    // success(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function(count) {
        if(count === 0) {
            Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma'
            }).then(function() {
                console.log("Base de datos inicializada");
            }).catch(function(err){
                console.log(`Error: ${err}`);
            });         
        }
        
    }).catch(function(err){
        console.log(`Error: ${err}`);
    });
}).catch(function(err){
    console.log(`Error: ${err}`);
});

