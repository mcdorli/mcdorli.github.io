function Matrix3() {
	this.data = [];
	for (var i = 0; i < 9; i++) {
		this.data[i] = 0;
	}
}

Matrix3.prototype.setIdentity = function() {
	this.data[0 + 0 * 3] = 1;
	this.data[1 + 1 * 3] = 1;
	this.data[2 + 2 * 3] = 1;
}

Matrix3.prototype.add = function(mat) {
	if (mat instanceof Matrix3) {
		for (var i = 0; i < 9; i++) {
			this.data[i] += mat.data[i];
		}
	}
}

Matrix3.prototype.subtract = function(mat) {
	if (mat instanceof Matrix3)
		this.add(mat.negate());
}

Matrix3.prototype.multiplyScalar = function(n) {
	for (var i = 0; i < 9; i++) {
		this.data[i] *= n;
	}
}

Matrix3.prototype.negate = function() {
	this.multiply(-1);
}

Matrix3.prototype.multiplyVector = function(vec) {
	if (vec instanceof Vector3) {
		var x = this.data[0 + 0 * 3] * vec.x + this.data[1 + 0 * 3] * vec.y + this.data[2 + 0 * 3] * vec.z;
		var y = this.data[0 + 1 * 3] * vec.x + this.data[1 + 1 * 3] * vec.y + this.data[2 + 1 * 3] * vec.z;
		var z = this.data[0 + 2 * 3] * vec.x + this.data[1 + 2 * 3] * vec.y + this.data[2 + 2 * 3] * vec.z;
		
		return new Vector3(x, y, z);
	}
}

Matrix3.prototype.multiplyMatrix = function(mat) {
	if (mat instanceof Matrix3) {
		var result = new Matrix3();
		for (var y = 0; y < 3; y++) {
			for (var x = 0; x < 3; x++) {
				var sum = 0;
				for (var e = 0; e < 3; e++) {
					sum += this.data[y + e * 3] * mat.data[e + x * 3];
				}
				result.data[y + x * 3] = sum;
			}
		}
		return result;
	}
}

Matrix3.prototype.transpose = function() {
	var result = new Matrix3();
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			result.data[y + x * 3] = this.data[x + y * 3]; 
		}
	}
	return result;
}

Matrix3.translate = function(vec) {
	var result = new Matrix3();
	result.setIdentity();
	if (vec instanceof Vector2) {
		result.data[0 + 2 * 3] = vec.x;
		result.data[1 + 2 * 3] = vec.y;
	} else if (vec instanceof Vector3) {
		result.data[0 + 2 * 3] = vec.x;
		result.data[1 + 2 * 3] = vec.y;
		result.data[2 + 2 * 3] = vec.z;
	}
	return result;
}

Matrix3.rotate = function(angle, x, y, z) {
	var result = new Matrix3();
	result.setIdentity();
	
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	var omc = 1 - cos;
	
	result.data[0 + 0 * 3] = x * omc + cos;
	result.data[0 + 1 * 3] = y * x * omc + z * sin;
	result.data[0 + 2 * 3] = x * z * omc - y * sin;
	
	result.data[1 + 0 * 3] = x * y * omc - z * sin;
	result.data[1 + 1 * 3] = y * omc + cos;
	result.data[1 + 2 * 3] = y * z * omc + x * sin;
	
	result.data[2 + 0 * 3] = x * z * omc + y * sin;
	result.data[2 + 1 * 3] = y * z * omc - x * sin;
	result.data[2 + 2 * 3] = z * omc + cos;
	
	return result;
}

Matrix3.scale = function(vec) {
	var result = new Matrix3();
	result.setIdentity();
	
	if (vec instanceof Vector3) {	
		result.data[0 + 0 * 3] = vec.x;
		result.data[1 + 1 * 3] = vec.y;
		result.data[2 + 2 * 3] = vec.z;
		
		return result;
	} else if (vec instanceof Vector2) {
		result.data[0 + 0 * 3] = vec.x;
		result.data[1 + 1 * 3] = vec.y;
		
		return result;
	}
}