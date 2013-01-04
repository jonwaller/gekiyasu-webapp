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



var audio = [
	{
		title:'A audio',
		oldPrice:'2',
		newPrice:'1'
	},
	{
		title:'B audio',
		oldPrice:'4',
		newPrice:'2'
	}
];

var movies = [
	{
		title:'A movie',
		oldPrice:'2',
		newPrice:'1'
	},
	{
		title:'B movie',
		oldPrice:'4',
		newPrice:'2'
	},
	{
		title:'C movie',
		oldPrice:'8',
		newPrice:'4'
	}
];

var books = null; //Filled before server start

//JSON routes

app.get('/books', function(req, res){
	serverHelper.sendAsJson(books,res);
});

app.get('/audio', function(req, res){
	serverHelper.sendAsJson(audio,res);
});

app.get('/movies', function(req, res){
	serverHelper.sendAsJson(movies,res);
});


console.log("Gekiyasu server starting...");
amazonHelper.refreshBooksArray(function(err,booksArray){
	if (err) throw err;
	books = booksArray;
	
	app.listen(8080);
	console.log("Listening on port %d", app.address().port);
});
