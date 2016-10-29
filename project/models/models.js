const path = require('path');

// Cargar Modelo ORM
const Sequelize = require('sequelize');

// Usar DDBB MySQL
var sequelize = new Sequelize('MVCExpress', 'homestead', 'secret', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

// Importa la definicion de la tabla Quiz en quiz.js
const Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exporta definicion de tabla Quizes

// squelize.sync crea e inicializa tabla de preguntas en DB
sequilize.sync().success(function() {
    // success(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().success(function(count) {
        if(count === 0) {
            Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma'
            }).success(function() {
                console.log("Base de datos inicializada");
            });            
        }
        
    });
});

