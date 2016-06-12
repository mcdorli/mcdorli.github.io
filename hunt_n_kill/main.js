var scope = new function() {

var c, ctx;
var huntnKill;
var maze;
var cellSize = 10;
var cellCount = 20;
var size = cellCount * cellSize * 2 + cellSize;

var path = [];
var road = [];

function main() {
	c = document.getElementById("canvas");
	c.width = size;
	c.height = size;
	ctx = c.getContext("2d");
	
	huntnKill = new HuntnKill(cellCount);
	
	ctx.lineWidth = 2;
	
	maze = huntnKill.getMaze();
	loop();
}

function loop() {
	update();
	render();
	window.requestAnimationFrame(loop);
}

this.generate = function() {
	maze = new HuntnKill(cellCount).getMaze();
}

function update() {
	
}

function render() {
	ctx.clearRect(0, 0, size, size);
	for (var x = 0; x < maze.length; x++) {
		for (var y = 0; y < maze[x].length; y++) {
			if (maze[x][y])
				ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
		}
	}
	ctx.strokeStyle = "red";
	ctx.beginPath();
	for (var r of road) {
		ctx.lineTo(r.x * cellSize + cellSize / 2, r.y * cellSize + cellSize / 2);
	}
	ctx.stroke();
}

main();
}