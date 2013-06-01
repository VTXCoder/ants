var mongoose = require('mongoose');
var Account = mongoose.model('Account');
var extras = require('./../extras');
var control = require('./../vtx/control');


control.addPage("admin/accounts",function(req,res,cb) {
	Account.find({active:true},function (err, accounts) {
	  if (err) return cb(err);
	  return cb(null,{page:'accounts',accounts:accounts});
	})
});

control.addPage("admin/account",function(req,res,cb) {
	return cb(null,{page:'accounts'});
});
