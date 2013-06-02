
var mongoose 		= require('mongoose')
var Schema 			= mongoose.Schema;
var _ 				= require('underscore');
var settings		= require('../vtx/common').getSettings();

/*** ENUMS ***/

var terrainTypes=["blocked","leaves","sand","wood"];
var featureTypes=["green_leaf_200x150","log_500x180"];


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

	featureTypes: function() {
		return featureTypes;
	},

	clientFeatures: function() {
		var clientFeatures=[];
		_.each(this.features,function(f) {
			//f.path=settings.cdn+"features/"+f.type+".png";
			//console.log(f);
			var path=settings.cdn+"features/"+f.type+".png";

			clientFeatures.push({x:f.left,y:f.top,path:path,rotation:f.rotation});
		});
		return clientFeatures;
	},

	updateFeature: function(x,y,feature,rotation) {
		if (!feature) {
			console.log("Removing feature");
			this.features=_.reject(this.features,function(t) {if (t.left==x && t.top==y) return true});
		} else {
			var f=_.find(this.features,function(t) {if (t.left==x && t.top==y) return true});
			if (f) {
				f.type=feature;
				f.rotation=rotation;
			} else {
				this.features.push({left:x,top:y,type:feature,rotation:rotation});
			}
		}
	},

	getFeature: function(x,y) {
		var f=_.find(this.features,function(t) {if (t.left==x && t.top==y) return true});
		if (f) return f.type;
			else
				return null;
	},

	getFeatureRotation: function(x,y) {
		var f=_.find(this.features,function(t) {if (t.left==x && t.top==y) return true});
		if (f) return f.rotation;
			else
				return 0;
	},

	updateTerrain: function(x,y,terrain) {
		var f=_.find(this.terrain,function(t) {if (t.left==x && t.top==y) return true});
		if (f) {
			f.type=terrain;
		} else {
			this.terrain.push({left:x,top:y,type:terrain});
		}
		//console.log("Updating terrain at "+x+"/"+y+" to "+terrain);
	},

	getTerrain: function(x,y) {
		var f=_.find(this.terrain,function(t) {if (t.left==x && t.top==y) return true});
		if (f) return f.type;
			else
				return this.defaultTerrain;
	}
}

mongoose.model("Grid",GridSchema); 

