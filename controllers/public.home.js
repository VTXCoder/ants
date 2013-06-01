var control = require('./../vtx/control');


control.addPageRequest("public/home",function(req,res,cb) {
	return cb(null,{page:'public-home'});
});


