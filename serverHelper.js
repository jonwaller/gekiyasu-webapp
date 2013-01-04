var express = require('express');

function configureApp(app){

	app.configure(function(){
		app.set('views', __dirname + '/views');
		app.set('view engine', 'hbs');
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(__dirname + '/public'));
	});

	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 

	return app;
}

function sendAsJson(dataObjectToSend, responseStream){
	var jsonDataToSend = JSON.stringify(dataObjectToSend);
	
	responseStream.contentType('application/json');
	responseStream.send(jsonDataToSend);
}

exports.configureApp = configureApp;
exports.sendAsJson = sendAsJson;