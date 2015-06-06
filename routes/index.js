var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

router.get('/quizes/question',quizController.question);
router.get('/quizes/answer',quizController.answer);
router.get('/author',quizController.author);


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});




module.exports = router;
