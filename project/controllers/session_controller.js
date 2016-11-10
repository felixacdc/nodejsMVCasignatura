// GET /login
exports.new = function(req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};
    
    res.render('sessions/new', {errors});
};