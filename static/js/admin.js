
$(function() {

	$(gridEvents).on("cellClick",function(e,data) {
		console.log("Clicked "+data.x+"x"+data.y+" "+data.grid.data.id);
		console.log(data.grid.data.id);
		vtx.get("/admin/grid/position",data.grid.data.id+"/"+data.x+"/"+data.y,$("#cellUpdate"));
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
});