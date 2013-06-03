
$(function() {



	// Used by admin
	$(".buttonLoadGrid").on("click",function() {
		gridLayout.$grid=$(".grid");
		var id=$(this).data('id');
		vtx.read("grid-data",id,function(data) {
			gridData.init(data);
		});
	});


	$(gridEvents).on("cellClick",function(e,data) {
		//console.log("Clicked "+data.x+"x"+data.y+" "+data.grid.data.id);
		//console.log(data.grid.data.id);
		var $pos=$("#cellUpdate");
		vtx.get("/admin/grid/position",data.grid.data.id+"/"+data.x+"/"+data.y,$pos);
		$pos.off().on("click",".buttonUpdate",function(e) {
			vtx.update("admin-grid-position",data.grid.data.id,$pos.find("form"),function(d) {
				if (d.ok) {
					Notifier.success("Saved Position: "+data.x+"/"+data.y);
					console.log(d);
					vtx.read("grid-data",data.grid.data.id,function(_grid) {
						gridData.init(_grid);
					});
				}
			});
		});
	});

	$(gridEvents).on("cellHover",function(e,data) {
		//console.log("Hover "+data.x+"x"+data.y);
		//console.log(data.cell);
		$("#cellDump").html(data.x+"x"+data.y+" "+data.cell.terrain);
	});

	$(gridEvents).on("cellHoverClear",function(e,data) {
		//console.log("Hover "+data.x+"x"+data.y);
		//console.log(data.cell);
		$("#cellDump").text("");
	});


	$(".buttonLoadGrid").trigger("click");
});



