
// Test File

vtx={};

vtx.server={};

vtx.read=function(entity,id,cb) {vtx.call("get",entity,id,null,cb)};
vtx.delete=function(entity,id,cb) {vtx.call("delete",entity,id,null,cb)};
vtx.update=function(entity,id,data,cb) {vtx.call("put",entity,id,data,cb)};
vtx.create=function(entity,data,cb) {vtx.call("post",entity,null,data,cb)};

vtx.get=function(entity,id,$e) {
	var form=null;

	console.log(entity);

	// Remote URL
	var remoteURL=entity+"/";
	if (id) remoteURL+=String(id);

	// Make the Ajax call
	$.ajax({
		url: remoteURL,
		dataType: "json",
		success: function(data) {
			if (data && data.error) {
				alert("Server Exception\n\n"+data.error);
			} else {
				$e.html(data.html);
			}
		},
		error: function(xhr,testStatus,errorThrown) {
			console.log(xhr.responseText);
		}
	});
}

vtx.call=function(verb,entity,id,callData,callBack) {
	var form=null;

	// Serialize the form object from almost any kind of data type
	if (callData) {
		if (callData.selector) {
			
			// Don't lose the check boxes!
			var checkboxes=callData.find("input[type='checkbox']");
			if (checkboxes.length) {
				_.each(checkboxes,function(box) {
					if ($(box).prop("checked")) {
						$(box).attr("value","true");
					} else {
						callData.append($("<input />",{type:"hidden",value:"false",name:$(box).attr("name")}));
					}
				});
			}
			form=callData.serialize();
		}

		if (!form && callData.type && callData.type=="form") {form=$(callData).serialize();}
		if (!form) form=callData;
	}

	// Remote URL
	var remoteURL="/call/"+entity+"/";
	if (id) remoteURL+=id;

	// Make the Ajax call
	$.ajax({
		url: remoteURL,
		//accepts: 'application/json',
		success: function(data) {
			//console.log(data);
			// Error handling incomplete
			if (data && data.error) {
				// Incomplete (just alert it for now)
				//console.log("Server "+data.error);
				alert("Server Exception\n\n"+data.error);
			} else {
				callBack(data);
			}
		},
		error: function(xhr,testStatus,errorThrown) {
			console.log(xhr.responseText);
		},
		data: form,
		dataType: 'json',
		type: verb
	});

};





