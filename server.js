var settings = require('./settings/development').settings;
var vtx=require('./../../../vtxcode/vtx').init(settings,__dirname);
var app=vtx.getApp();
 
// Routes
app.get('/', function(req,res,next) {
	global.handlers.page(req,res,next,"public/home");
});
 

// Admin
app.get('/admin', function(req,res,next) {
	global.handlers.page(req,res,next,"admin/home");
});


/**** VTX Handlers ****/
vtx.ajaxHandling();
vtx.errorHandling();



