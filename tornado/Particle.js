function Particle(pos, angle, size) {
	this.pos = pos;
	this.start = new Vector3(pos.x, pos.y, pos.z);
	this.color = 100;
	this.angle = angle;
	this.size = size;
	this.dead = false;
}

Particle.prototype.update = function() {
	this.pos.y += 0.1;
	this.angle += 0.0001 * this.pos.y;
	
	var t = (this.pos.y - 10) / this.size * 10;
	
	var radius = Math.exp(t / 2) / 100 * this.size / 4 + 2;
	if (radius >= this.size || this.y > this.size * 1.5) {
		this.dead = true;
	} else {
		this.pos.x = Math.cos(this.angle) * radius;
		this.pos.z = Math.sin(this.angle) * radius;
	}
	
	this.color = ((Math.sin(this.angle % (2 * Math.PI) - 0.5 * Math.PI)) + 1) * 50 + 50 | 0;
}

Particle.prototype.draw = function(ctx) {
	ctx.fillStyle = "rgb(" + [this.color, this.color, this.color] + ")";
	var proj = (this.pos.z + this.start.z + this.size / 2) / this.size / 5;
	if (proj > 0) {
		ctx.beginPath();
		ctx.arc(this.pos.x / proj + this.start.x, (-this.pos.y + 10) / proj, 0.6 / proj, 0, 2 * Math.PI);
		ctx.fill();
	}
}