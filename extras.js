var _=require("underscore");

// Only merge fields that are a match in both directions
exports.MergeDocumentForm=function(doc,form) {
	_.each(form,function(v,f) {
		if (typeof(doc[f])!="undefined") {
			console.log("Matched: "+f);
			//if (v=="on") v=true;
			doc[f]=v;
		}
	});
}