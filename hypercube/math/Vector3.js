function Vector3(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

Vector3.prototype.mag = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

Vector3.prototype.distance = function(vec) {
	if (vec instanceof Vector3)
		return Math.sqrt((this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y) + (this.z - vec.z) * (this.z - vec.z));
}

Vector3.prototype.add = function(vec) {
	if (vec instanceof Vector3) {
		this.x += vec.x;
		this.y += vec.y;
		this.z += vec.z;
	}
	return this;
}

Vector3.prototype.subtract = function(vec) {
	if (vec instanceof Vector3) {
		this.add(vec.negate);
	}
	return this;
}

Vector3.prototype.negate = function() {
	this.multiply(-1);
	return this;
}

Vector3.prototype.multiply = function(n) {
	this.x *= n;
	this.y *= n;
	this.z *= n;
	return this;
}

Vector3.prototype.divide = function(n) {
	if (n != 0) {
		this.multiply(1 / n);
	}
	return this;
}

Vector3.prototype.normalize = function() {
	this.divide(this.mag());
	return this;
}

Vector3.cross = function(vec1, vec2) {
	if (vec1 instanceof Vector3 && vec2 instanceof Vector3) {
		var x = vec1.y * vec2.z - vec1.z * vec2.y;
		var y = vec1.z * vec2.x - vec1.x * vec2.z;
		var z = vec1.x * vec2.y - vec1.y * vec2.x;
		return new Vector3(x, y, z);
	}
}

Vector3.dot = function(vec1, vec2) {
	if (vec1 instanceof Vector3 && vec2 instanceof Vector3) {
		return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
	}
}