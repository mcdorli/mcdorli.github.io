var global = new function() {

var c, ctx;
var size = 64;
var cellSize = 8;

var grid = [];
var quads = [];

function main() {
	c = document.getElementById("canvas");
	c.width = size * cellSize;
	c.height = size * cellSize;
	ctx = c.getContext("2d");
		
	for (var x = 0; x < size; x++) {
		grid[x] = [];
		for (var y = 0; y < size; y++) {
			grid[x][y] = 1;
		}
	}
	
	c.addEventListener("click", function(e) {
		grid[(e.clientX - this.offsetLeft) / cellSize | 0][(e.clientY - this.offsetTop) / cellSize | 0] = 0;
		loop();
	})
	
	ctx.lineWidth = 2;
	
	loop();
}

this.generate = function() {
	for (var x = 0; x < size; x++) {
		grid[x] = [];
		for (var y = 0; y < size; y++) {
			grid[x][y] = 1;
		}
	}
	loop();
}

function loop() {
	update();
	render();
}

function update() {
	quads = [];
	
	var done = [];
	for (var x = 0; x < size; x++) {
		done[x] = [];
		for (var y = 0; y < size; y++) {
			done[x][y] = false;
		}
	}
	
	var iterations = 1;
	var j = size;
	while (j != 1) {
		iterations++;
		j /= 2;
	}
	
	var sampleSize = size;
	
	for (var i = 0; i < iterations; i++) {
		for (var xx = 0; xx < size / sampleSize; xx++) {
			for (var yy = 0; yy < size / sampleSize; yy++) {
				var different = true;
				var beginValue = grid[xx * sampleSize][yy * sampleSize];
				
				positions:
				for (var x = 0; x < sampleSize; x++) {
					for (var y = 0; y < sampleSize; y++) {
						if (grid[xx * sampleSize + x][yy * sampleSize + y] != beginValue || done[xx * sampleSize + x][yy * sampleSize + y]) {
							different = false;
							break positions;
						}
					}
				}
				
				if (different) {
					quads.push({x: xx * sampleSize, y: yy * sampleSize, width: sampleSize, height: sampleSize});
					for (var x = 0; x < sampleSize; x++) {
						for (var y = 0; y < sampleSize; y++) {
							done[xx * sampleSize + x][yy * sampleSize + y] = true;
						}
					}
				}
			} 
		}
		sampleSize /= 2;
	}
}

function render() {
	ctx.clearRect(0, 0, size * cellSize, size * cellSize);
	
	for (var x = 0; x < size; x++) {
		for (var y = 0; y < size; y++) {
			if (grid[x][y]) {
				ctx.fillRect(x *cellSize, y * cellSize, cellSize, cellSize);
			}
		}
	}
	quads.reverse();
	for (var i = 0; i < quads.length; i++) {
		var quad = quads[i];
		var hue = quad.width / (size / 2) * 360;
		var color = "hsl(" + hue + ", 100%, 80%)";
		ctx.strokeStyle = color;
		ctx.strokeRect(quad.x * cellSize, quad.y * cellSize, quad.width * cellSize, quad.height * cellSize);
	}
}

main();
};