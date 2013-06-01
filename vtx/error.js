
exports.addErrorRouting=function(app) {
	
	// Page Not Found
	app.get('/*', function(req, res){
		res.format({
		  html: function() {res.status(404);res.render(__dirname+'/error.jade',{error:[], message: "Page Not Found" ,path: req.path, status: 404});},
	  	  json: function() {res.status(404);res.type('json');res.send(JSON.stringify({error:"Not Found: "+req.path}));}
		});
	});

	// Error handling
	app.use(function(err, req, res, next){
		console.log(req.path);
	  	console.log(err.stack);

	  	res.format({
	  	  json: function() {res.status(500);res.type('json');res.send(JSON.stringify({error:err.toString()}));},
		  html: function() {res.status(500);res.render(__dirname+'/error.jade', {message: "Unexpected Error",  error: err ,path: req.path, status: 500});}
		});
	});

}