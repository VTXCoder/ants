
exports.addErrorRouting=function(app) {
	
	// Page Not Found
	app.get('/*', function(req, res){
		res.format({
	  	  'application/json': function() {res.contentType('json');res.send(JSON.stringify({error:"Not Found: "+req.path}));},
		  'text/html': function() { res.render(__dirname+'/error.jade',{error:[], message: "Page Not Found" ,path: req.path, status: 404});}
		});
	});

	// Error handling
	app.use(function(err, req, res, next){
		console.log(req.path);
	  	console.log(err.stack);

	  	res.format({
	  	  'appliation/json': function() {res.contentType('json');res.send(JSON.stringify({error:err.toString()}));},
		  'text/html': function() {res.render(__dirname+'/error.jade', {message: "Unexpected Error",  error: err ,path: req.path, status: 500});}
		});
	});

}