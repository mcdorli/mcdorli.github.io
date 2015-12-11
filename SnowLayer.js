var count;

function SnowLayer() {
	count = c.width / 20 + 1;
	
	this.points = [];
	for (var i = 0; i < count; i++) {
		this.points[i] = new Vector2(i * c.width / (c.width / 50), c.height-10);
	}
}
var growth = 0.10;
SnowLayer.prototype.update = function() {
	var r = Math.floor(Math.random() * count);
	
	this.points[r].y -= growth;
	if (r > 0) {
		this.points[r-1].y -= growth / 2;
	}
	if (r < count-1) {
		this.points[r + 1].y -= growth / 2;
	}
}

SnowLayer.prototype.render = function() {
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.moveTo(0, c.height);
	for (var i = 0; i < count; i++) {
		ctx.lineTo(this.points[i].x, this.points[i].y);
	}
	ctx.lineTo(c.width, c.height);
	ctx.closePath();
	ctx.fill();
}