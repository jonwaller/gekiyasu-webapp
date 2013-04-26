var http = require('http')
	fs = require('fs');

var OperationHelper = require('apac').OperationHelper;

var opHelper = new OperationHelper({
    awsId:     'AKIAJWN4LDVS5VD4CMAA',
    awsSecret: 'j3XwzYPU8yV7o1G64QA61QNQnFO5bpQBsdOpvR8E',
    assocId:   '[YOUR ASSOCIATE TAG HERE]'
});

function getItemsFromAmazon(q,searchType,callback){

	if (searchType=="books") searchType="Books";
	if (searchType=="dvds") searchType="DVD";
	if (searchType=="electronics") searchType="Electronics";

	console.log('Real search:',q,searchType,searchType=="books");
	opHelper.execute(
		'ItemSearch', {
			'SearchIndex': searchType,
			'Keywords': q,
			'ResponseGroup': 'ItemAttributes,Offers,Images,EditorialReview'
		}, function(err,result){
			if (err) return callback(err,result);
			var itemsResultObject=result.ItemSearchResponse.Items;
			var itemsArray=itemsResultObject[0].Item;
			
			var simpleResults={};

			for (var itemId in itemsArray){
				var item=itemsArray[itemId];

				var resultItem={};

				console.log(item);

				if (item.ItemAttributes[0].Author)
					resultItem.author=item.ItemAttributes[0].Author[0];
				if (item.ItemAttributes[0].Title)
					resultItem.title=item.ItemAttributes[0].Title[0];
				if (item.ItemAttributes[0].ListPrice)
					resultItem.listprice=item.ItemAttributes[0].ListPrice[0].FormattedPrice[0];
				
				resultItem.offerprice=0;
				if (item.OfferSummary && item.OfferSummary[0].LowestNewPrice)
					resultItem.offerprice=item.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
				if (item.MediumImage)
					resultItem.image=item.MediumImage[0].URL[0];
				if (item.EditorialReviews)
					resultItem.description=item.EditorialReviews[0].EditorialReview[0].Content[0];
				
				simpleResults[resultItem.title]=resultItem;
			}

			callback(err,simpleResults);
		});
}

exports.getItemsFromAmazon = getItemsFromAmazon;
