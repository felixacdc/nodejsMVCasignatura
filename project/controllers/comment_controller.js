let models = require('../models/models.js');

// GET /quizes/quizId
exports.new = function(req, res) {
    res.render('comments/new.ejs', { quizid: req.params.quizId, errors: [] });
};

exports.create = function(req, res) {
    let comment = models.Comment.build({
       texto: req.body.comment.texto,
        quizeId: req.params.quizId
    });
    
    comment.validate().then(function(err){
        if(err)
            res.render('comments/new.ejs', { quizid: req.params.quizId, comment, errors: err.errors });
        else {
            comment.save().then(function() {
                res.redirect('/quizes/' + req.params.quizId);
            }).catch(function(err) {
                console.log('Error: ' + err);
            });
        }
    }).catch(function(err) {
        console.log('Error: ' + err);
    });
};