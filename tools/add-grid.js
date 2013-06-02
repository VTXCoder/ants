
var common = require('../vtx/common');
var settings = common.getSettings();
common.initModels();

var mongoose = require('mongoose')
mongoose.connect(common.getMongooseConnectionString(settings))

var Grid = mongoose.model('Grid');

var g=new Grid({
	name:"DeadLeaves-1x1-Log",
	width:20,
	height:10,
	active:true
});

g.save(function() {
	process.exit();
});