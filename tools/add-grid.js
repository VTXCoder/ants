
var env=process.env.NODE_ENV || 'development';
var settings = require('./../settings/'+env).settings;

require('./../core/models/grid');
var mongoose = require('mongoose');

mongoose.connect(settings.mongodb)

var Grid = mongoose.model('Grid');

var g=new Grid({
	name:"DeadLeaves-1x1",
	width:30,
	height:30,
	active:true
});

g.save(function() {
	process.exit();
});