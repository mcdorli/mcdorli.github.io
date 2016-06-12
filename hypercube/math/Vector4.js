function Vector4(x, y, z, w) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}

Vector4.prototype.mag = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z, this.w * this.w);
}

Vector4.prototype.distance = function(vec) {
	if (vec instanceof Vector4)
		return Math.sqrt((this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y) + (this.z - vec.z) * (this.z - vec.z) + (this.w - vec.w) * (this.w - vec.w));
}

Vector4.prototype.add = function(vec) {
	if (vec instanceof Vector4) {
		this.x += vec.x;
		this.y += vec.y;
		this.z += vec.z;
		this.w += vec.w;
	}
	return this;
}

Vector4.prototype.subtract = function(vec) {
	if (vec instanceof Vector4) {
		this.add(vec.negate);
	}
	return this;
}

Vector4.prototype.negate = function() {
	this.multiply(-1);
	return this;
}

Vector4.prototype.multiply = function(n) {
	this.x *= n;
	this.y *= n;
	this.z *= n;
	this.w *= n;
	return this;
}

Vector4.prototype.divide = function(n) {
	if (n != 0) {
		this.multiply(1 / n);
	}
	return this;
}

Vector4.prototype.normalize = function() {
	this.divide(this.mag());
	return this;
}

Vector4.dot = function(vec1, vec2) {
	if (vec1 instanceof Vector4 && vec2 instanceof Vector4) {
		return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z + vec1.w * vec2.w;
	}
}