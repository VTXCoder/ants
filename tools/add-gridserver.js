
var env=process.env.NODE_ENV || 'development';
var settings = require('./../settings/'+env).settings;

require('./../models/gridserver');
var mongoose = require('mongoose');

mongoose.connect(settings.mongodb)

var GridServer = mongoose.model('GridServer');

var g=new GridServer({
	domainName:"localhost",
	port:4002,
	active:true
});

g.save(function() {
	process.exit();
});