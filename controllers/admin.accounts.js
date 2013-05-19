var mongoose = require('mongoose');
var Account = mongoose.model('Account');
var extras = require('./../extras');

global.handlers.addPage("admin/accounts",function(req,res,cb) {
	Account.find({active:true},function (err, accounts) {
	  if (err) return cb(err);
	  return cb(null,{page:'accounts',accounts:accounts});
	})
});

global.handlers.addPage("admin/account",function(req,res,cb) {
	return cb(null,{page:'accounts'});
});
