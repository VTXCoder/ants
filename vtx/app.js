var common 		= require('./common');
var control 	= require('./control');
var flash 		= require('connect-flash');
var express 	= require('express');

exports.app=function() {

	var settings = defaultSettings(common.getSettings());
	var app = express();

	app.configure(function(){
		app.set('views', settings.baseDir + settings.viewsFolder);
		app.set('view engine', settings.viewEngine);
		app.use(flash());
		app.use(express.cookieParser('vtxvtxvtx'));
		app.use(express.bodyParser());

		if (settings.sessionManagement=="redis") {
			var RedisStore = require('connect-redis')(express);
			app.use(express.session({ store: new RedisStore }));
		}

		if (settings.sessionManagement=="express") {
			app.use(express.session());
		}

		if (settings.sessionManagement=="mongo") {
			var MongoStore = require('connect-mongo')(express);
			app.use(express.session({
				secret: "v1txsec3ts",
				maxAge: new Date(Date.now() + 7776000000) , // 3 months
				store: new MongoStore(settings.mongodb)
			}));
		}

		if (settings.social.facebook) {
			app.use(passport.initialize());
  			app.use(passport.session());
		}
 
		app.use(express.methodOverride());
		app.use(express.static(settings.baseDir + settings.staticFolder));
		app.use(express.favicon());
		app.use(app.router);
		app.enable("jsonp callback");
	});
	
	app.get('/vtx.js', function(req, res){
	    res.sendfile(__dirname+'/vtx.js');
	});

	app.all('/call/*', function(req,res,next) {
		var type="";
		if (req.method=="GET") type="read";
		if (req.method=="PUT") type="update";
		if (req.method=="POST") type="create";
		if (req.method=="DELETE") type="delete";
		var id=null;
		var sPath=req.path.split("/");
		var entity=sPath[2];
		if (sPath.length>2) id=sPath[3];

		if (type && entity) {
			control.call(req,res,type,entity,id,req.body,function(err,data){
				if (err) return next(err);
				res.contentType('json');
				data.flash=req.flash();
				return res.send(data);
			});
		} else next();
	});

	return app;
}



var defaultSettings=function(s) {
	if (!s.sessionManagement) s.sessionManagement="express";
	if (!s.staticFolder) s.staticFolder="/static";
	if (!s.viewsFolder) s.viewsFolder="/views";
	if (!s.templatesFolder) s.templatesFolder=s.viewsFolder+"/template";
	if (!s.viewEngine) s.viewEngine="jade";
	if (!s.siteName) s.siteName="VTX Server";
	if (!s.handlersFolder) s.handlersFolder=dirname+"/handlers";

	if (!s.port) s.port=4000;
	return s;
}