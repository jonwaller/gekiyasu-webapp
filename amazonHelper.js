var xml2json = require("node-xml2json");
var http = require('http')
	fs = require('fs');

function _downloadBooksFeed(callback){
	console.log('Downloading books.rss');

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
			callback(null, fileData);
		});
	});
}

function refreshBooksArray(callback){
	console.log('Refreshing books.rss');

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
					productList[i]={}
					productList[i].title=booksObjectJson.rss.channel[channelItem][productItem].title;
					productList[i].link=booksObjectJson.rss.channel[channelItem][productItem].link;
					productList[i].pubDate=booksObjectJson.rss.channel[channelItem][productItem].pubDate;
					i++;
				}
			}
		}

		callback(null, productList);
	});
}

exports.refreshBooksArray = refreshBooksArray;