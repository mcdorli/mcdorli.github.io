var c, ctx;

var particles = [];

function main() {
	c = document.getElementById("canvas");
	
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	
	ctx = c.getContext("2d");
	
	snowLayer = new SnowLayer();
	
	for (var i = 0; i < 0; i++) {
		particles[i] = new Snow(Math.random() * (c.width + 300) - 300, Math.random() * c.height);
	}
	
	loop();
}

function loop() {
	update();
	render();
	
	window.setTimeout(loop, 16);
}

var snowCount = 0;
var particlesLength = 1501;
var snowLayer;

function update() {
	var currentSnowCount = snowCount;
	for (var i in particles) {
		if (particles[i].y > c.height) {
			particles[i] = new Snow(Math.random() * c.width, 0);
			currentSnowCount--;
		}
	}
	
	for (var i = 0; i < currentSnowCount; i++) {
		particles[particlesLength] = new Snow(Math.random() * c.width, 0);
		particlesLength++;
	}
	
	for (var particle in particles) {
		particles[particle].update();
	}
	
	snowLayer.update();
}

function render() {
	ctx.fillStyle = "#000055";
	ctx.fillRect(0, 0, c.width, c.height);
	for (var particle in particles) {
		particles[particle].render();
	}
	
	snowLayer.render();
}