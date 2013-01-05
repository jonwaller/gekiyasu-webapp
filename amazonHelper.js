var xml2json = require("node-xml2json");
var http = require('http')
	fs = require('fs');

//books
function _downloadBooksFeed(callback){
	console.log('Downloading books data from Amazon...');

	var options = {
		host: 'www.amazon.co.jp',
		port: 80,
		path: '/gp/rss/bestsellers/books/'
	}

	var request = http.get(options, function(res){
		var fileData = ''
		//res.setEncoding('binary');
		res.setEncoding('utf8');

		res.on('data', function(chunk){
			fileData += chunk
		});

		res.on('end', function(){
			console.log('Downloaded. Length: '+fileData.length+' bytes.');
			callback(null, fileData);
		});
	});
}

function refreshBooksArray(callback){

	_downloadBooksFeed(function(err, booksRssFileData){
		if (err) throw err;
		
		booksRssFileData=booksRssFileData.replace(/<!\[CDATA\[.*?\]\]>/g,"");
		var booksObjectJson = xml2json.parser(booksRssFileData);

		var productList=[];

		//rss.channel.item.title
		for (var channelItem in booksObjectJson.rss.channel){
			if (channelItem=='item'){
				var i=0;
				for(var productItem in booksObjectJson.rss.channel[channelItem]){
					
					var product={};
					product.title=booksObjectJson.rss.channel[channelItem][productItem].title;
					product.link=booksObjectJson.rss.channel[channelItem][productItem].link;
					product.pubdate=booksObjectJson.rss.channel[channelItem][productItem].pubdate;
					
					productList[i]={};
					productList[i].title=product.title.trim();
					productList[i].link=product.link.trim();
					productList[i].pubDate=product.pubdate.trim();

					i++;
				}
			}
		}

		callback(null, productList);
	});
}

//-----------------------------------
//electronics
function _downloadElectronicsFeed(callback){
	console.log('Downloading electronics data from Amazon...');

	var options = {
		host: 'www.amazon.co.jp',
		port: 80,
		path: '/gp/rss/bestsellers/electronics/'
	}

	var request = http.get(options, function(res){
		var fileData = ''
		//res.setEncoding('binary');
		res.setEncoding('utf8');

		res.on('data', function(chunk){
			fileData += chunk
		});

		res.on('end', function(){
			console.log('Downloaded. Length: '+fileData.length+' bytes.');
			callback(null, fileData);
		});
	});
}

function refreshElectronicsArray(callback){

	_downloadElectronicsFeed(function(err, electronicsRssFileData){
		if (err) throw err;
		
		electronicsRssFileData = electronicsRssFileData.replace(/<!\[CDATA\[.*?\]\]>/g,"");
		var electronicsObjectJson = xml2json.parser(electronicsRssFileData);

		var productList=[];

		//rss.channel.item.title
		for (var channelItem in electronicsObjectJson.rss.channel){
			if (channelItem=='item'){
				var i=0;
				for(var productItem in electronicsObjectJson.rss.channel[channelItem]){
					
					var product={};
					product.title=electronicsObjectJson.rss.channel[channelItem][productItem].title;
					product.link=electronicsObjectJson.rss.channel[channelItem][productItem].link;
					product.pubdate=electronicsObjectJson.rss.channel[channelItem][productItem].pubdate;
					
					productList[i]={};
					productList[i].title=product.title.trim();
					productList[i].link=product.link.trim();
					productList[i].pubDate=product.pubdate.trim();

					i++;
				}
			}
		}

		callback(null, productList);
	});
}

//-----------------------------------
//dvd

function _downloadMoviesFeed(callback){
	console.log('Downloading dvd data from Amazon...');

	var options = {
		host: 'www.amazon.co.jp',
		port: 80,
		path: '/gp/rss/bestsellers/dvd/'
	}

	var request = http.get(options, function(res){
		var fileData = ''
		//res.setEncoding('binary');
		res.setEncoding('utf8');

		res.on('data', function(chunk){
			fileData += chunk
		});

		res.on('end', function(){
			console.log('Downloaded. Length: '+fileData.length+' bytes.');
			callback(null, fileData);
		});
	});
}

function refreshMoviesArray(callback){

	_downloadMoviesFeed(function(err, moviesRssFileData){
		if (err) throw err;
		
		moviesRssFileData=moviesRssFileData.replace(/<!\[CDATA\[.*?\]\]>/g,"");
		var moviesObjectJson = xml2json.parser(moviesRssFileData);

		var productList=[];

		//rss.channel.item.title
		for (var channelItem in moviesObjectJson.rss.channel){
			if (channelItem=='item'){
				var i=0;
				for(var productItem in moviesObjectJson.rss.channel[channelItem]){
					
					var product={};
					product.title=moviesObjectJson.rss.channel[channelItem][productItem].title;
					product.link=moviesObjectJson.rss.channel[channelItem][productItem].link;
					product.pubdate=moviesObjectJson.rss.channel[channelItem][productItem].pubdate;
					
					productList[i]={};
					productList[i].title=product.title.trim();
					productList[i].link=product.link.trim();
					productList[i].pubDate=product.pubdate.trim();

					i++;
				}
			}
		}

		callback(null, productList);
	});
}
//-----------------------------------

exports.refreshBooksArray = refreshBooksArray;
exports.refreshElectronicsArray = refreshElectronicsArray;
exports.refreshMoviesArray = refreshMoviesArray;
