var express = require('express');
var app = module.exports = express.createServer();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'hbs');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 

app.get('/', function(req, res){
	res.render('index', {});
});

app.get('/categories', function(req, res){
	res.render('categories', {});
});

app.get('/products', function(req, res){
	res.render('products', {});
});

app.get('/about', function(req, res){
	res.render('about', {});
});

console.log("Gekiyasu server starting...");
app.listen(8080);
console.log("Listening on port %d", app.address().port);
