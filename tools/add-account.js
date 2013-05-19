
var env=process.env.NODE_ENV || 'development';
var settings = require('./../settings/'+env).settings;

require('./../models/account');
var mongoose = require('mongoose');

mongoose.connect(settings.mongodb)

var Account = mongoose.model('Account');

var g=new Account({
	username:"vortex",
	password:"vortex",
	email:"daniel@shuya.com.au",
	active:true

});

g.save(function() {
	process.exit();
});