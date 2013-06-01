var control = require('./../vtx/control');



control.addPage("admin/home",function(req,res,cb) {
	return cb(null,{page:'home'});
});


