
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore');

/*** ENUMS ***/

var terrainTypes=["blocked","leaves","sand","wood"];
 
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
	defaultTerrain: String,
	features:[GridFeatureSchema],
	terrain:[GridTerrainSchema]
});

GridSchema.path('defaultTerrain').validate(function (defaultTerrain) {
  if (terrainTypes.indexOf(this.defaultTerrain) !== -1) return true
  return false;
}, 'Invalid Terrain')

GridSchema
  .virtual('size')
  .get(function() { return this.width+"x"+this.height })

GridSchema.methods = {
	terrainTypes: function() {
		return terrainTypes;
	},

	updateTerrain: function(x,y,terrain) {
		var f=_.find(this.terrain,function(t) {if (t.left==x && t.top==y) return true});
		if (f) {
			f.type=terrain;
		} else {
			this.terrain.push({left:x,top:y,type:terrain});
		}
		console.log("Updating terrain at "+x+"/"+y+" to "+terrain);
	},

	getTerrain: function(x,y) {
		var f=_.find(this.terrain,function(t) {if (t.left==x && t.top==y) return true});
		if (f) return f.type;
			else
				return this.defaultTerrain;
	}
}

mongoose.model("Grid",GridSchema); 

