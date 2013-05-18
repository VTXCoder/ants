
var env=process.env.NODE_ENV || 'development';
var settings = require('./../settings/'+env).settings;

require('./../core/models/gridserver');
var mongoose = require('mongoose');

mongoose.connect(settings.mongodb)

var GridServer = mongoose.model('GridServer');

var g=new GridServer({
	domainName:"localhost",
	port:4004,
	active:true
});

g.collection.remove(function(err) {
	process.exit();
});