var xml2json = require("node-xml2json");
var http = require('http')
	fs = require('fs');

var OperationHelper = require('apac').OperationHelper;

var opHelper = new OperationHelper({
    awsId:     'AKIAJWN4LDVS5VD4CMAA',
    awsSecret: 'j3XwzYPU8yV7o1G64QA61QNQnFO5bpQBsdOpvR8E',
    assocId:   '[YOUR ASSOCIATE TAG HERE]'
});


function refreshBooksArray(callback){

	opHelper.execute(
		'ItemSearch', {
			'SearchIndex': 'Books',
			'Keywords': 'harry potter',
			'ResponseGroup': 'ItemAttributes,Offers,Images,EditorialReview'
		}, function(err,result){
			if (err) return callback(err,result);
			var itemsResultObject=result.ItemSearchResponse.Items;
			var itemsArray=itemsResultObject[0].Item;
			
			var simpleResults={};

			for (var itemId in itemsArray){
				var item=itemsArray[itemId];

				var resultItem={};

				if (item.ItemAttributes[0].Author) resultItem.author=item.ItemAttributes[0].Author[0];
				if (item.ItemAttributes[0].Title) resultItem.title=item.ItemAttributes[0].Title[0];
				if (item.ItemAttributes[0].ListPrice) resultItem.price=item.ItemAttributes[0].ListPrice[0].FormattedPrice[0];
				if (item.MediumImage) resultItem.image=item.MediumImage[0].URL[0];
				if (item.EditorialReviews) resultItem.description=item.EditorialReviews[0].EditorialReview[0].Content[0];
				
				simpleResults[resultItem.title]=resultItem;
			}

			callback(err,simpleResults);
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
