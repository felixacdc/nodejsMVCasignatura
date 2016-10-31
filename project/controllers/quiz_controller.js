const models = require('../models/models.js');

// Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
    models.Quiz.findById(quizId).then((quiz) => {
        if(quiz) {
            req.quiz = quiz;
            next();
        } else {
            next(new Error('No existe quizId=' + quizId));
        }
    }).catch((err) => {
        next(err);
    });
};

//GET /quizes
exports.index = function (req, res) {
    models.Quiz.findAll().then((quizes) => {
        res.render('quizes/index.ejs', { quizes });
    }).catch(() => {
        console.log(`Error: ${err}`);
    });
};

// GET /quizes/id
exports.show = function (req, res) {
    res.render('quizes/show', { quiz: req.quiz });
};

// GET /quizes/id/answer
exports.answer = function (req, res) {
    var respuesta = 'Incorrecto';
    if(req.query.respuesta == req.quiz.respuesta)
        respuesta = 'Correcto';
    
    res.render('quizes/answer', { quiz: req.quiz, respuesta});
};