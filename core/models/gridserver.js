
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore');


var GridServerSchema=new Schema({
	domainName: String,
	port: Number,
	active: Boolean,
	load: Number,
	grids:[{gridName:String}]
});

mongoose.model("GridServer",GridServerSchema); 