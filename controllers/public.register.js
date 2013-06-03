var control = require('./../vtx/control');

control.addPage("public/register",function(req,res,cb) {
	return cb(null,{page:'register'});
});
