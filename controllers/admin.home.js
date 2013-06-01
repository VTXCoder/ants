var control = require('./../vtx/control');



control.addPageRequest("admin/home",function(req,res,cb) {
	return cb(null,{page:'home'});
});


