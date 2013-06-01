
//https://github.com/madhums/nodejs-express-mongoose-demo/blob/master/app/controllers/users.js

// We need to check that everyone is an admin in here!

var mongoose = require('mongoose');
var GridServer = mongoose.model('GridServer');
var control = require('./../vtx/control');


control.addPage("admin/servers",function(req,res,cb) {

	GridServer.find(function (err, servers) {
	  if (err) return cb(err);
	  //console.log(servers);
	  return cb(null,{page:'servers',servers:servers});
	})

	
});


