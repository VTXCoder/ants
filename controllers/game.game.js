var control = require('./../vtx/control');



control.addPage("game/game",function(req,res,cb) {
	return cb(null,{page:'game'});
});

