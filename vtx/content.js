
var _=require('underscore');
var moment = require('moment');
var settings = require('./common').getSettings();

var readContent=function() {
	var fs = require('fs');
	var path = __dirname + '/../content/'+settings.lang;
	fs.readdirSync(path).forEach(function (file) {
	  	var c=require(path+'/'+file);
	  	content[file.split(".")[0]]=c;
	});
}

exports.get=function(set,id) {
	if (content[set] && content[set][id]) {
		return content[set][id];
	} else {
		return '['+set+'.'+id+']';
	}
}

if (!content) {
	var content=[];
	readContent();
}
