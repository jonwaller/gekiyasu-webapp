var express = require('express'),
	serverHelper = require('./serverHelper');

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


var books = [
	{
		title:'A book',
		oldPrice:'2',
		newPrice:'1'
	},
	{
		title:'B book',
		oldPrice:'4',
		newPrice:'2'
	},
	{
		title:'C book',
		oldPrice:'8',
		newPrice:'4'
	}
];

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

//JSON routes

app.get('/books', function(req, res){
	serverHelper.sendAsJson(books,res);
});

app.get('/audio', function(req, res){
	serverHelper.sendAsJson(books,res);
});


console.log("Gekiyasu server starting...");
app.listen(8080);
console.log("Listening on port %d", app.address().port);
