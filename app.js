var express = require('express'),
	serverHelper = require('./serverHelper'),
	amazonHelper = require('./amazonHelper');

var app = express();
app = serverHelper.configureApp(app);

app.get('/', function(req, res){

	var q=null;
	var dirtyQ = req.query["q"];
	if (dirtyQ && dirtyQ.length>0) q=dirtyQ;

	var searchType="books";
	var dirtySearchType = req.query["searchType"];
	if (dirtySearchType && dirtySearchType.length>0) searchType=dirtySearchType;

	res.render('index', {q:q,searchType:searchType});
});

app.get('/search', function(req, res){

	var q=null;
	var dirtyQ = req.query["q"];
	if (dirtyQ && dirtyQ.length>0) q=dirtyQ;

	var searchType="books";
	var dirtySearchType = req.query["searchType"];
	if (dirtySearchType && dirtySearchType.length>0) searchType=dirtySearchType;

	console.log('getItemsFromAmazon',q,searchType);
	amazonHelper.getItemsFromAmazon(q,searchType,function(err,searchResults){
		if (err) return false;
		serverHelper.sendAsJson(searchResults,res);
	})

});

app.listen(8080);
