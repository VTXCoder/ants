/*** Version 1




***/


exports.getMongooseConnectionString=function(settings) {
	var dbUrl = 'mongodb://';
	if (settings.mongodb.username) dbUrl += settings.mongodb.username;
	if (settings.mongodb.password) dbUrl += ':'+settings.mongodb.password;
	if (settings.mongodb.username || settings.mongodb.password) +'@';
	dbUrl += settings.mongodb.host+':'+settings.mongodb.port;
	dbUrl += '/' + settings.mongodb.db;
	return dbUrl;
}

exports.getSettings=function() {
	var env=process.env.NODE_ENV || 'development';
	var settings = require('./../settings/'+env).settings;
	return settings;
}

exports.initModels=function() {
	var fs = require('fs');
	var models_path = __dirname + '/../models'
	fs.readdirSync(models_path).forEach(function (file) {
		console.log("Initialised Model: "+file);
	  	require(models_path+'/'+file)
	});
}

exports.initControllers=function() {
	var fs = require('fs');
	var models_path = __dirname + '/../controllers'
	fs.readdirSync(models_path).forEach(function (file) {
		console.log("Initialised Controller: "+file);
	  	require(models_path+'/'+file)
	});
}
