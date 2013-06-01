/*
	On the client the grid is made up of individual cells


*/
var gridData={};
var gridLayout={};

$(function() {

	gridData=new gridDataObject();
	gridLayout=new gridLayoutObject();

	// Used by admin
	$(".buttonLoadGrid").on("click",function() {
		gridLayout.$grid=$(".grid");
		var id=$(this).data('id');
		vtx.read("grid-data",id,function(data) {
			gridData.init(data);
		});
	});

});

var gridDataObject=function() {
	this.data=null;
	this.hoverX=null;
	this.hoverY=null;
	this.map=[];

	this.init=function(data) {
		var self=this;
		console.log("Creating Grid: "+data.name);
		this.data=data;
		gridLayout.grid=this;

		// Reset the map
		this.map=[];
		for (var x=0;x<this.data.width;x++) {
			this.map[x]=[];for (var y=0;y<this.data.height;y++) 
				this.map[x][y]={};
		}

		// Default Terrain
		if (this.data.defaultTerrain) {
			for (var x=0;x<this.data.width;x++) {
				for (var y=0;y<this.data.height;y++) { 
					this.map[x][y].terrain=this.data.defaultTerrain;
				}
			}
		}

		// Create the frame
		gridLayout.renderFrame(this.data.width,this.data.height);
		
		// Background
		if (this.data.background) gridLayout.renderBackground(this.data.background);

	};

	this.getCell=function(x,y) {
		return this.map[x-1][y-1];
	}

	_.bindAll();
}



var gridLayoutObject=function() {
	this.grid=null;
	this.$grid=null;
	this.baseCellSize=25;
	this.cellSize=25;
	this.frameCellWidth=0;
	this.frameCellHeight=0;
	this.frameWidth=0;
	this.frameHeight=0;

	this.renderFrame=function(width,height,scaleWidth,scaleHeight) {
		var self=this;
		this.$grid.html("");
		this.$grid.disableSelection();
		this.frameCellWidth=width;
		this.frameCellHeight=height;

		this.frameWidth=width*this.cellSize;
		this.frameHeight=height*this.cellSize;

		this.$grid.css("width",this.frameWidth);
		this.$grid.css("height",this.frameHeight);

		// Events
		this.$grid.off();

		this.$grid.on("mousemove",function(e) {

			var x=e.pageX-this.offsetLeft;
			var y=e.pageY-this.offsetTop;

			var prevX=self.grid.hoverX;
			var prevY=self.grid.hoverY;

			var hoverX=parseInt(x/self.cellSize)+1;
			var hoverY=parseInt(y/self.cellSize)+1;

			// Fix the rounding error on edges
			if (hoverX>self.frameCellWidth) hoverX=self.frameCellWidth;
			if (hoverY>self.frameCellHeight) hoverY=self.frameCellHeight;
			if (hoverX<1) x=1;if (hoverY<1) y=1;
			
			self.grid.hoverX=hoverX;
			self.grid.hoverY=hoverY;


			if (prevX!=self.grid.hoverX || prevY!=self.grid.hoverY) self.showHoverCell();
		});

		this.$grid.on("mouseleave",function(e) {
			self.grid.hoverX=null;
			self.grid.hoverY=null;
			$('#position').html("");
			self.showHoverCell();
		});

		this.$grid.on("click",function(e) {
			e.stopPropagation();
			$(gridEvents).trigger("cellClick",{x:self.grid.hoverX,y:self.grid.hoverY,cell:self.grid.getCell(self.grid.hoverX,self.grid.hoverY)});
		});


	};

	this.showHoverCell=function() {
		var self=this;
		if (self.grid.hoverX && self.grid.hoverY) {
			this.$grid.find(".hoverCell").remove();
			var posX=(self.grid.hoverX-1)*self.cellSize;
			var posY=(self.grid.hoverY-1)*self.cellSize;
			var $h=$("<div />",{"class":"hoverCell"}).css({"width":self.cellSize+1,"height":self.cellSize+1,"top":posY,"left":posX});
			this.$grid.append($h);

			$(gridEvents).trigger("cellHover",{x:self.grid.hoverX,y:self.grid.hoverY,grid:self.grid,cell:self.grid.getCell(self.grid.hoverX,self.grid.hoverY)});

		} else {
			this.$grid.find(".hoverCell",{grid:self.grid}).remove();

			$(gridEvents).trigger("cellHoverClear");

		}
	};


	this.scaleFrame=function(width,height) {


	};

	this.renderBackground=function(background) {
		this.$grid.css({"background-image":"url("+background+")"});
	

	};



	_.bindAll();
}

