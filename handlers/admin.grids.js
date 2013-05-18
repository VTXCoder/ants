
//https://github.com/madhums/nodejs-express-mongoose-demo/blob/master/app/controllers/users.js
 
// We need to check that everyone is an admin in here!

var mongoose = require('mongoose');
var Grid = mongoose.model('Grid');
var extras = require('./../extras');

global.handlers.addPage("admin/grids",function(req,res,cb) {
	Grid.find({active:true},function (err, grids) {
	  if (err) return cb(err);
	  return cb(null,{page:'grids',grids:grids});
	})
});

global.handlers.addPage("admin/grid",function(req,res,cb) {
	Grid.findById(req.params.id,function (err, grid) {
	  if (err) return cb(err);
	  console.log(grid);
	  return cb(null,{page:'grids',grid:grid});
	})
});

global.handlers.addUpdateCall("admin-grid",function(req,id,formData,cb) {
	console.log(formData);
	Grid.findById(id,function (err, grid) {
		if (err) return cb(err);
		if (formData.active) formData.active=true; else formData.active=false;
		extras.MergeDocumentForm(grid,formData);
		grid.save(function(err) {
			if (err) {
				console.log(err);
				return cb(null,{ok:false,errors:["Unknown Error"]});
			} 
			return cb(null,{ok:true,redirect:"/admin/grids"});
		});
	});
});

