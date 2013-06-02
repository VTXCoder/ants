
//https://github.com/madhums/nodejs-express-mongoose-demo/blob/master/app/controllers/users.js
 
// We need to check that everyone is an admin in here!

var mongoose 	= require('mongoose');
var Grid 		= mongoose.model('Grid');
var _ 			= require('underscore');
var control 	= require('./../vtx/control');

control.addPage("admin/grid/index",function(req,res,cb) {
	Grid.find({active:true},function (err, grids) {
	  if (err) return cb(err);
	  return cb(null,{page:'grids',grids:grids});
	})
});

control.addPage("admin/grid/grid",function(req,res,cb) {
	Grid.findById(req.params.id,function (err, grid) {
	  if (err) return cb(err);
	  return cb(null,{page:'grids',grid:grid});
	})
});


control.addPage("admin/grid/position",function(req,res,cb) {
	Grid.findById(req.params.id,function (err, grid) {
	  	if (err) return cb(err);
	 	return cb(null,{grid:grid,id:req.params.id,x:req.params.x,y:req.params.y});
	})
});


control.addUpdateCall("admin-grid-position",function(req,id,formData,cb) {
	console.log(formData);
	Grid.findById(id,function (err, grid) {
		if (err) return cb(err);
		
		grid.updateTerrain(formData.x,formData.y,formData.terrain);
		grid.updateFeature(formData.x,formData.y,formData.feature,formData.rotation);

		//grid.getTerrain(formData.x,formData.y);

		grid.save(function(err) {
			if (err) {
				console.log(err);
				return cb(null,{ok:false,validationError:err});
			} 
			return cb(null,{ok:true});
		});

		
	});
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

