var control = require('./../vtx/control');


control.addPage("public/home",function(req,res,cb) {
	return cb(null,{page:'public-home'});
});


