
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore');


var GridFeatureSchema=new Schema({
	type:String,
	left:Number,
	top:Number,
	rotation:Number
});

var GridTerrainSchema=new Schema({
	type:String,
	left:Number,
	top:Number
});

var GridSchema=new Schema({
	name: String,
	active: Boolean, 
	width: Number,
	height: Number,
	background: String,
	features:[GridFeatureSchema],
	terrain:[GridTerrainSchema]
});

GridSchema
  .virtual('size')
  .get(function() { return this.width+"x"+this.height })

mongoose.model("Grid",GridSchema); 