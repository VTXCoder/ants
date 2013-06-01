
var common = require('../vtx/common');
var settings = common.getSettings();
common.initModels();

var mongoose = require('mongoose')
mongoose.connect(common.getMongooseConnectionString(settings))

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