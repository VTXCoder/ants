var control = require('./vtx/control');


exports.init=function(app) {

	// Public Routes
	app.get('/', function(req,res,next) {
		control.page(req,res,next,"public/home");
	});

	app.get('/account', function(req,res,next) {
		control.page(req,res,next,"public/account");
	}); 

	app.get('/login', function(req,res,next) {
		control.page(req,res,next,"public/login");
	}); 

	app.get('/forgot', function(req,res,next) {
		control.page(req,res,next,"public/forgot");
	}); 

	app.get('/register', function(req,res,next) {
		control.page(req,res,next,"public/register");
	}); 

	// Game Routes
	app.get('/game', function(req,res,next) {
		control.page(req,res,next,"game/game");
	});

	// Admin Routes
	app.get('/admin', function(req,res,next) {
		control.page(req,res,next,"admin/home");
	});
	app.get('/admin/servers', function(req,res,next) {
		control.page(req,res,next,"admin/servers");
	});
	app.get('/admin/grids', function(req,res,next) {
		control.page(req,res,next,"admin/grid/index");
	});
	app.get('/admin/grid/:id', function(req,res,next) {
		control.page(req,res,next,"admin/grid/grid");
	});
	app.get('/admin/grid/position/:id/:x/:y', function(req,res,next) {
		control.page(req,res,next,"admin/grid/position");
	});

	app.get('/admin/accounts', function(req,res,next) {
		control.page(req,res,next,"admin/accounts");
	});
	app.get('/admin/account/:id', function(req,res,next) {
		control.page(req,res,next,"admin/account");
	});

}