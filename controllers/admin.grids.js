
//https://github.com/madhums/nodejs-express-mongoose-demo/blob/master/app/controllers/users.js
 
// We need to check that everyone is an admin in here!

var mongoose = require('mongoose');
var Grid = mongoose.model('Grid');
var _ = require('underscore');
var control = require('./../vtx/control');

control.addPageRequest("admin/grids",function(req,res,cb) {
	Grid.find({active:true},function (err, grids) {
	  if (err) return cb(err);
	  return cb(null,{page:'grids',grids:grids});
	})
});

control.addPageRequest("admin/grid",function(req,res,cb) {
	Grid.findById(req.params.id,function (err, grid) {
	  if (err) return cb(err);
	  console.log(grid);
	  return cb(null,{page:'grids',grid:grid});
	})
});

control.addUpdateCall("admin-grid",function(req,id,formData,cb) {
	console.log(formData);
	Grid.findById(id,function (err, grid) {
		if (err) return cb(err);
		_.extend(grid,formData);
		//extras.MergeDocumentForm(grid,formData);
		grid.save(function(err) {
			if (err) {
				console.log(err);
				return cb(null,{ok:false,validationError:err});
			} 
			return cb(null,{ok:true,redirect:"/admin/grids"});
		});
	});
});

