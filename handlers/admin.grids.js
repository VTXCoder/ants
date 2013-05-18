
//https://github.com/madhums/nodejs-express-mongoose-demo/blob/master/app/controllers/users.js
 
// We need to check that everyone is an admin in here!

var mongoose = require('mongoose');
var Grid = mongoose.model('Grid');

global.handlers.addPage("admin/grids",function(req,res,cb) {
	Grid.find({active:true},function (err, grids) {
	  if (err) return cb(err);
	  return cb(null,{page:'grids',grids:grids});
	})
});


