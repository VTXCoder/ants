
$(function() {

	$(gridEvents).on("cellClick",function(e,data) {
		console.log("Clicked "+data.x+"x"+data.y);
		console.log(data.cell);
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