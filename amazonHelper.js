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
			
			console.log();
			console.log('Author',itemsArray[0].ItemAttributes[0].Author[0]);
			console.log('Title',itemsArray[0].ItemAttributes[0].Title[0]);
			console.log('Price',itemsArray[0].ItemAttributes[0].ListPrice[0].FormattedPrice[0]);
			console.log('Image',itemsArray[0].MediumImage[0].URL[0]);
			console.log('Description',itemsArray[0].EditorialReviews[0].EditorialReview[0].Content[0]);
			console.log();
				
			callback(err,result);
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
