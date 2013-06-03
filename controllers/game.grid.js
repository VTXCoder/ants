
//https://github.com/madhums/nodejs-express-mongoose-demo/blob/master/app/controllers/users.js
 
// We need to check that everyone is an admin in here!

var settings		= require('../vtx/common').getSettings();
var mongoose 		= require('mongoose');
var Grid 			= mongoose.model('Grid');
var _ 				= require('underscore');
var control 		= require('./../vtx/control');

control.addReadCall("grid-data",function(req,id,cb) {
	Grid.findById(id,function (err, grid) {
		if (err) return cb(err);
		
		var data={};
		data.id=grid._id;
		data.name=grid.name;
		data.background=settings.cdn + "bg/"+ grid.background;
		data.width=grid.width;
		data.height=grid.height;
		data.defaultTerrain=grid.defaultTerrain;
		data.terrain=grid.terrain;
		//data.features=grid.clientFeatures();

		return cb(null,data);
	});
});

