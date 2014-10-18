
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/result', function (req, res) {
	if((!req.param('first').match("^[0-9]+$"))||(!req.param('second').match("^[0-9]+$")))
		res.render('index', { title: 'Calculator',error:"Both values have to numbers" });
	var first=req.param('first');
	var second=req.param('second');
	var operator=req.param('operation');
	/*if(req.param('first')=='' ||req.param('second')=='') {
		res.statusCode = 400;
		return res.send('Two values have to be provided');
	}
	*/
	if(typeof req.param('operation')=='undefined'){
		res.render('index', { title: 'Calculator',error:"Select an operator" });
	}
	if(req.param('operation')=='Add'){
		var result=Number(first)+Number(second);
		res.send("The result is "+result);
	}
	else if(req.param('operation')=='Sub'){
		var result=Number(first)-Number(second);
		res.send("The result is "+result);
	}
	else if(req.param('operation')=='Mul'){
		var result=Number(first)*Number(second);
		res.send("The result is "+result);
	}
	else if(req.param('operator')=='Div'){
		if(Number(second)==0)
			return res.send('Division by 0 not allowed!');
		else{
		var result=Number(first)/Number(second);
		res.send("The result is "+result);
		}
	}
	else
		{
		return res.send('Invalid Operator!!!');
		}
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
