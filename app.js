var express = require('express'),
	serverHelper = require('./serverHelper'),
	amazonHelper = require('./amazonHelper');

var app = module.exports = express.createServer();
app = serverHelper.configureApp(app);


//HTML routes

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


var books = null; //Filled before server start
var electronics = null;
var movies = null;

//JSON routes

app.get('/books', function(req, res){
	serverHelper.sendAsJson(books,res);
});

app.get('/electronics', function(req, res){
	serverHelper.sendAsJson(electronics,res);
});

app.get('/dvd', function(req, res){
	serverHelper.sendAsJson(movies,res);
});

console.log("Gekiyasu server starting...");
amazonHelper.refreshBooksArray(function(err,booksArray){
	
	if (err) throw err;
	books = booksArray;
	
		amazonHelper.refreshElectronicsArray(function(err,electronicsArray){
			if (err) throw err;
			electronics = electronicsArray;

			amazonHelper.refreshMoviesArray(function(err,moviesArray){
				if (err) throw err;
				movies = moviesArray;

					app.listen(8080);
					console.log("Listening on port %d", app.address().port);
			});
		});
});
