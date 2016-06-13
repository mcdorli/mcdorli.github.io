(function tornado() {

	var c, ctx;
	var width, height;
	
	var particles = [];
	var vel = new Vector3(0, 0, 0);
	var start;
	var maxSpeed = 0.4;
	
	function main() {
		c = document.getElementById("canvas");
		width = innerWidth - 17;
		height = innerHeight;
		c.width = width;
		c.height = height;
		ctx = c.getContext("2d");
		
		ctx.translate(width / 2, height);
		
		start = new Vector3(0, 10, 0);
		
		loop();
	}
	
	function loop() {
		update();
		render();
		window.requestAnimationFrame(loop);
	}
	
	function update() {
		for (var i = 0; i < 2; i++) {
			var brightness = Math.random() * 100 | 0;
			particles.push(new Particle(
				new Vector3(start.x, start.y, start.z),
				Math.random() * 2 * Math.PI,
				100
			));
		}
		
		for (var i in particles) {
			particles[i].update();
		}
		
		var temp = particles.slice();
		for (var i = temp.length - 1; i >= 0; i--) {
			if (temp[i].dead) {
				particles.splice(i, 1);
			}
		}
		
		vel.x += Math.random() * 1 - 0.45;
		vel.z += Math.random() * 1 - 0.45;
		var mag = vel.mag();
		if (mag > maxSpeed) {
			vel.normalize().multiply(maxSpeed);
		}
		
		start.add(vel);
	}
	
	function render() {
		ctx.clearRect(-width / 2, -height, width, height);
		
		particles.sort(function(a, b) {
			return b.pos.z - a.pos.z;
		});
		
		for (var i in particles) {
			particles[i].draw(ctx);
		}
	}
	main();
})();