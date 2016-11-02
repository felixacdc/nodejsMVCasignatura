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
        res.render('quizes/index.ejs', { quizes, errors: [] });
    }).catch(() => {
        console.log(`Error: ${err}`);
    });
};

// GET /quizes/id
exports.show = function (req, res) {
    res.render('quizes/show', { quiz: req.quiz, errors: [] });
};

// GET /quizes/id/answer
exports.answer = function (req, res) {
    var respuesta = 'Incorrecto';
    if(req.query.respuesta == req.quiz.respuesta)
        respuesta = 'Correcto';
    
    res.render('quizes/answer', { quiz: req.quiz, respuesta, errors: [] });
};

// GET /quizes/new
exports.new = function (req, res) {
    var quiz = models.Quiz.build(
        { pregunta: "Pregunta", respuesta: "Respuesta"}
    );
    
    res.render("quizes/new", {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function (req, res) {
    var quiz = models.Quiz.build( req.body.quiz );
    
    // guarda en DB los campos pregunta y respuesta de quiz
    quiz
    .validate()
    .then(function(err){
       if(err) {
           res.render('quizes/new', {quiz, errors: err.errors});
       } else {
           quiz.save({ fields: ["pregunta", "respuesta"]}).then(() => {
                res.redirect("/quizes");
            }).catch((err) => {
               console.log(`Error: ${err}`);
            });
       }
    });
};