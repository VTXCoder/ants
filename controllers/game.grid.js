
//https://github.com/madhums/nodejs-express-mongoose-demo/blob/master/app/controllers/users.js
 
// We need to check that everyone is an admin in here!

var mongoose = require('mongoose');
var Grid = mongoose.model('Grid');
var _ = require('underscore');

global.handlers.addReadCall("grid-data",function(req,id,cb) {
	Grid.findById(id,function (err, grid) {
		if (err) return cb(err);
		
		var data={};
		data.name=grid.name;
		data.background=global.settings.cdn + "bg/"+ grid.background;
		data.width=grid.width;
		data.height=grid.height;
		data.defaultTerrain=grid.defaultTerrain;

		// Other stuff

		return cb(null,data);
	});
});

