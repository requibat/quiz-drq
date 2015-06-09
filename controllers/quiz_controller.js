var models = require('../models/models.js');

//Autoload
exports.load=function(req, res, next,quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz){
				req.quiz = quiz;
				next();
			}else{ next(new Error('No existe quizId=' + quizId));}
		}
	).catch(function(error) { next(error);});
};

// Get /quizes
exports.index = function(req,res) {
	if (!req.query.search){ 
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes});
		}
		).catch(function(error) {next(error);})
	}else{
		models.Quiz.findAll({where: ["pregunta like ?","%"+req.query.search.split(" ").join("%")+"%"]} ).then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes.sort()});
		}
		).catch(function(error) {next(error);})
	}
};

//Get /quiz/:id
exports.show = function(req,res){
	res.render('quizes/show',{quiz: req.quiz});
};

// GET /quizes/answer
exports.answer = function(req,res){
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado});
};

// GET author
exports.author= function(req,res){
	res.render('author');
};
