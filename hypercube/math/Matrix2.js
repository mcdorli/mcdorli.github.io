function Matrix2() {
	this.data = [];
	for (var i = 0; i < 4; i++) {
		this.data[i] = 0;
	}
}

Matrix2.prototype.setIdentity = function() {
	this.data[0 + 0 * 2] = 1;
	this.data[1 + 1 * 2] = 1;
}

Matrix2.prototype.add = function(mat) {
	if (mat instanceof Matrix2) {
		for (var i = 0; i < 4; i++) {
			this.data[i] += mat.data[i];
		}
	}
}

Matrix2.prototype.subtract = function(mat) {
	if (mat instanceof Matrix2)
		this.add(mat.negate());
}

Matrix2.prototype.multiplyScalar = function(n) {
	for (var i = 0; i < 4; i++) {
		this.data[i] *= n;
	}
}

Matrix2.prototype.negate = function() {
	this.multiply(-1);
}

Matrix2.prototype.multiplyVector = function(vec) {
	if (vec instanceof Vector2) {
		var x = this.data[0 + 0 * 2] * vec.x + this.data[1 + 0 * 2] * vec.y;
		var y = this.data[0 + 1 * 2] * vec.x + this.data[1 + 1 * 2] * vec.y;
		
		return new Vector2(x, y, z);
	}
}

Matrix2.prototype.multiplyMatrix = function(mat) {
	if (mat instanceof Matrix2) {
		var result = new Matrix2();
		for (var y = 0; y < 2; y++) {
			for (var x = 0; x < 2; x++) {
				var sum = 0;
				for (var e = 0; e < 2; e++) {
					sum += this.data[y + e * 2] * mat.data[e + x * 2];
				}
				result.data[y + x * 2] = sum;
			}
		}
		return result;
	}
}

Matrix2.prototype.transpose = function() {
	var result = new Matrix2();
	for (var x = 0; x < 2; x++) {
		for (var y = 0; y < 2; y++) {
			result.data[y + x * 2] = this.data[x + y * 2]; 
		}
	}
	return result;
}

Matrix2.translate = function(vec) {
	var result = new Matrix2();
	result.setIdentity();
	if (vec instanceof Vector2) {
		result.data[0 + 1 * 2] = vec.x;
		result.data[1 + 1 * 2] = vec.y;
	}
	return result;
}

Matrix2.rotate = function(angle) {
	var result = new Matrix2();
	result.setIdentity();
	
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	
	result.data[0 + 0 * 2] = cos;
	result.data[0 + 1 * 2] = -sin;
	result.data[1 + 0 * 2] = sin;
	result.data[1 + 1 * 2] = cos;
	
	return result;
}

Matrix2.scale = function(vec) {
	var result = new Matrix2();
	
	if (vec instanceof Vector2) {
		result.data[0 + 0 * 2] = vec.x;
		result.data[1 + 1 * 2] = vec.y;
		
		return result;
	}
}