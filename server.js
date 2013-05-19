

var env=process.env.NODE_ENV || 'development';
var settings = require('./settings/'+env).settings;


var mongoose = require('mongoose')
mongoose.connect(settings.mongodb)

// Models
var fs = require('fs');
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
})

// Start the app
var vtx=require('./../../../vtxcode/vtx').init(settings,__dirname);
var app=vtx.getApp();

// Public Routes
app.get('/', function(req,res,next) {
	global.handlers.page(req,res,next,"public/home");
});

// Admin Routes
app.get('/admin', function(req,res,next) {
	global.handlers.page(req,res,next,"admin/home");
});
app.get('/admin/servers', function(req,res,next) {
	global.handlers.page(req,res,next,"admin/servers");
});
app.get('/admin/grids', function(req,res,next) {
	global.handlers.page(req,res,next,"admin/grids");
});
app.get('/admin/grid/:id', function(req,res,next) {
	global.handlers.page(req,res,next,"admin/grid");
});
app.get('/admin/accounts', function(req,res,next) {
	global.handlers.page(req,res,next,"admin/accounts");
});
app.get('/admin/account/:id', function(req,res,next) {
	global.handlers.page(req,res,next,"admin/account");
});

// Game Routes




/**** VTX Handlers ****/
vtx.ajaxHandling();
vtx.errorHandling();



