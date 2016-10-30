const models = require('../models/models.js');

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
    models.Quiz.findById(req.params.quizId).then((quiz) => {
        res.render('quizes/show', { quiz });
    }).catch((err) => {
        console.log(`Error: ${err}`);
    });
};

// GET /quizes/id/answer
exports.answer = function (req, res) {
    models.Quiz.findById(req.params.quizId).then((quiz) => {
        if(req.query.respuesta == quiz.respuesta)
            res.render('quizes/answer', { quiz, respuesta: 'Correcto'});
        else
            res.render('quizes/answer', { quiz, respuesta: 'Incorrecto'});
    }).catch((err) => {
        console.log(`Error: ${err}`);
    });
};