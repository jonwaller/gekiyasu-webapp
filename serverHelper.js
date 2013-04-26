var express = require('express'),
	_ = require('underscore');

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

function sendAsJson(dataToSend, responseStream){

	var jsonDataToSend = JSON.stringify(dataToSend);

	responseStream.contentType('application/json');
	responseStream.send(jsonDataToSend);
}

exports.configureApp = configureApp;
exports.sendAsJson = sendAsJson;