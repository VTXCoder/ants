
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore');

/*** VALIDATION ***/

var validateGridName=function(val) {
	if (val.length==0) return false;
	if (val.indexOf(" ") !=-1) return false;
	return true;
}

/*** SCHEMAS ***/

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
	name: {type:String,validate:[validateGridName,"The name must not contain spaces."]},
	active: Boolean, 
	width: {type:Number,min:4,max:40},
	height: {type:Number,min:4,max:40},
	background: String,
	features:[GridFeatureSchema],
	terrain:[GridTerrainSchema]
});

GridSchema
  .virtual('size')
  .get(function() { return this.width+"x"+this.height })

mongoose.model("Grid",GridSchema); 

