function Vector2(x, y) {
	this.x = x;
	this.y = y;
}

Vector2.prototype.mag = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector2.prototype.distance = function(vec) {
	if (vec instanceof Vector2)
		return Math.sqrt((this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y));
}

Vector2.prototype.add = function(vec) {
	if (vec instanceof Vector2) {
		this.x += vec.x;
		this.y += vec.y;
	}
	return this;
}

Vector2.prototype.subtract = function(vec) {
	if (vec instanceof Vector2)
		this.add(vec.negate);
	return this;
}

Vector2.prototype.negate = function() {
	this.multiply(-1);
	return this;
}

Vector2.prototype.multiply = function(n) {
	this.x *= n;
	this.y *= n;
	return this;
}

Vector2.prototype.divide = function(n) {
	if (n != 0) {
		this.multiply(1 / n);
	}
	return this;
}

Vector2.prototype.normalize = function() {
	this.divide(this.mag());
	return this;
}

Vector2.dot = function(vec1, vec2) {
	if (vec1 instanceof Vector2 && vec2 instanceof Vector2) {
		return vec1.x * vec2.x + vec1.y * vec2.y;
	}
}