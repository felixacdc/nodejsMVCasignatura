const path = require('path');

// Cargar Modelo ORM
const Sequelize = require('sequelize');

// Obtener variables de entrono
/*const hostDB = process.env.DATABASE_HOST,
      db = process.env.DATABASE_STORAGE,
      serverDB = process.env.DATABASE_SERVER,
      userDB = process.env.DATABASE_USER,
      passwordDB = process.env.DATABASE_PASSWORD;*/

// Usar DDBB MySQL
/*var sequelize = new Sequelize(db, userDB, passwordDB, {
  host: hostDB,
  dialect: serverDB
});*/

var sequelize = new Sequelize('MVCExpress', 'homestead', 'secret', {
  host: '192.168.10.10',
  dialect: 'mysql'
});

// Importa la definicion de la tabla Quiz en quiz.js
const Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Importar definicio de tabla comments
const Comment = sequelize.import(path.join(__dirname, 'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // exporta definicion de tabla Quizes
exports.Comment = Comment;

// squelize.sync crea e inicializa tabla de preguntas en DB
Quiz.sync().then(function() {
    // success(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function(count) {
        Comment.sync().then(function() {
            console.log(`Tabla comments creada`);
        }).catch(function(err) {
            console.log(`Error: ${err}`);
        });
        
        if(count === 0) {
            Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma'
            }).then(function() {
                console.log("Base de datos inicializada (pregunta 1)");
            }).catch(function(err){
                console.log(`Error: ${err}`);
            });
            
            Quiz.create({
                pregunta: 'Capital de Portugal',
                respuesta: 'Lisboa'
            }).then(function() {
                console.log("Base de datos inicializada (pregunta 2)");
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

