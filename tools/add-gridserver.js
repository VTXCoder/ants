
var common = require('../vtx/common');
var settings = common.getSettings();
common.initModels();

var mongoose = require('mongoose')
mongoose.connect(common.getMongooseConnectionString(settings))

var GridServer = mongoose.model('GridServer');

var g=new GridServer({
	domainName:"localhost",
	port:4002,
	active:true
});

g.save(function() {
	process.exit();
});