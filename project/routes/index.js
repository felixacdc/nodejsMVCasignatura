var express = require('express');
var router = express.Router();
const quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;
