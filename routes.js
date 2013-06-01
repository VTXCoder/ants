var control = require('./vtx/control');


exports.init=function(app) {

	// Public Routes
	app.get('/', function(req,res,next) {
		control.page(req,res,next,"public/home");
	});

	// Admin Routes
	app.get('/admin', function(req,res,next) {
		control.page(req,res,next,"admin/home");
	});
	app.get('/admin/servers', function(req,res,next) {
		control.page(req,res,next,"admin/servers");
	});
	app.get('/admin/grids', function(req,res,next) {
		control.page(req,res,next,"admin/grids");
	});
	app.get('/admin/grid/:id', function(req,res,next) {
		control.page(req,res,next,"admin/grid");
	});
	app.get('/admin/accounts', function(req,res,next) {
		control.page(req,res,next,"admin/accounts");
	});
	app.get('/admin/account/:id', function(req,res,next) {
		control.page(req,res,next,"admin/account");
	});

}