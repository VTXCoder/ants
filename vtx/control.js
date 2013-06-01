/*
 	Add request handlers
	
	page

	read
	update
	create
	delete

*/

var _   		= require('underscore');
var moment   	= require('moment');
var settings   	= require('./common').getSettings();
var content   	= require('./content');

var pages=[];
var calls=[];
//var templates=[];

exports.addPage=function(page,func) {
	if (!pages[page]) pages[page]=func;

}

exports.addTemplate=function(template,func) {
	if (!templates[template]) templates[template]=func;
}

exports.addReadCall=function(entity,func) {
	addCall(entity,"read",func);
}

exports.addUpdateCall=function(entity,func) {
	addCall(entity,"update",func);
}

exports.addCreateCall=function(entity,func) {
	addCall(entity,"create",func);
}

exports.addDeleteCall=function(entity,func) {
	addCall(entity,"delete",func);
}

exports.page=function(req,res,next,page) {
	execPage(req,res,page,function(err,html) {
		if (err) return next(err);
		res.format({
			json: function() {
				res.type('json');
				return res.send({ html: html });
			},
			html: function() {return res.send(html);}
		});
	});
};

exports.call=function(req,res,type,entity,id,formData,cb) {
	if (!calls[entity]) calls[entity]={};
	if (typeof(calls[entity][type]) == "function") {

		if (type=="read" || type=="delete") {
			calls[entity][type](req,id,function(err,data) {
				if (err) return cb(err);
				return cb(null,data);
			});
		} else {
			calls[entity][type](req,id,formData,function(err,data) {
				if (err) return cb(err);
				return cb(null,data);
			});
		}

	} else {
		return cb(new Error("API call not found: "+type+"Call -> "+entity));
	}
};
/*
exports.template=function(req,res,entity,formData,cb) {
	if (!templates[entity]) templates[entity]={};
	if (typeof(templates[entity]) == "function") {

		
		templates[entity](req,formData,function(err,data) {
			if (err) return cb(err);
			return cb(null,data);
		});
		

	} else {
		return cb(new Error("API call not found: Template -> "+entity));
	}
};
*/

var addCall=function(entity,type,func) {
	if (!calls[entity]) calls[entity]={};
	if (!calls[entity][type]) calls[entity][type]=func;
};



var execPage=function(req,res,page,cb) {
	var def={};
	def.session=req.session; 	// Send in the session
	def._=_; 					// Send in underscore
	def.moment=moment; 			// Send in moment
	def.req=req;				// And of course the request
	def.settings=settings;		// Send the settings
	def.content=content;		// Send the content

	if (typeof(pages[page]) == "function") {
		pages[page](req,res,function(err,data) {
			if (err) return cb(err);
			//console.log(data);
			if (data.redirect) {
				res.redirect(data.redirect);
				return cb();
			} else {
				data=_.extend(data,def);
				//if (data.page) page=data.page; // Can override the template
				//console.log(data.page);
				if (!data.title) data.title="";
				res.render(page,data,function(err,html) {
					if (err) return cb(err);
					return cb(null,html);
				});
			}

		});
	} else {
		return cb(new Error("Missing page controller: "+page));
	}
};
