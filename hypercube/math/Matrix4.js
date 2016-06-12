function Matrix4() {
	this.data = [];
	for (var i = 0; i < 16; i++) {
		this.data[i] = 0;
	}
}

Matrix4.prototype.setIdentity = function() {
	this.data[0 + 0 * 4] = 1;
	this.data[1 + 1 * 4] = 1;
	this.data[2 + 2 * 4] = 1;
	this.data[3 + 3 * 4] = 1;
}

Matrix4.prototype.add = function(mat) {
	if (mat instanceof Matrix4) {
		for (var i = 0; i < 16; i++) {
			this.data[i] += mat.data[i];
		}
	}
}

Matrix4.prototype.subtract = function(mat) {
	if (mat instanceof Matrix4)
		this.add(mat.negate());
}

Matrix4.prototype.multiplyScalar = function(n) {
	for (var i = 0; i < 16; i++) {
		this.data[i] *= n;
	}
}

Matrix4.prototype.negate = function() {
	this.multiply(-1);
}

Matrix4.prototype.multiplyVector = function(vec) {
	if (vec instanceof Vector4) {
		var x = this.data[0 + 0 * 4] * vec.x + this.data[1 + 0 * 4] * vec.y + this.data[2 + 0 * 4] * vec.z + this.data[3 + 0 * 4] * vec.w;
		var y = this.data[0 + 1 * 4] * vec.x + this.data[1 + 1 * 4] * vec.y + this.data[2 + 1 * 4] * vec.z + this.data[3 + 1 * 4] * vec.w;
		var z = this.data[0 + 2 * 4] * vec.x + this.data[1 + 2 * 4] * vec.y + this.data[2 + 2 * 4] * vec.z + this.data[3 + 2 * 4] * vec.w;
		var w = this.data[0 + 3 * 4] * vec.x + this.data[1 + 3 * 4] * vec.y + this.data[2 + 3 * 4] * vec.z + this.data[3 + 3 * 4] * vec.w;
		
		return new Vector4(x, y, z, w);
	}
}

Matrix4.prototype.multiplyMatrix = function(mat) {
	if (mat instanceof Matrix4) {
		var result = new Matrix4();
		for (var y = 0; y < 4; y++) {
			for (var x = 0; x < 4; x++) {
				var sum = 0;
				for (var e = 0; e < 4; e++) {
					sum += this.data[y + e * 4] * mat.data[e + x * 4];
				}
				result.data[y + x * 4] = sum;
			}
		}
		return result;
	}
}

Matrix4.prototype.transpose = function() {
	var result = new Matrix4();
	for (var x = 0; x < 4; x++) {
		for (var y = 0; y < 4; y++) {
			result.data[y + x * 4] = this.data[x + y * 4]; 
		}
	}
	return result;
}

Matrix4.rotate = function(angle, x, y, z, w) {
	var result = new Matrix4();
	result.setIdentity();
	
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	var omc = 1 - cos;
	
	result.data[0 + 0 * 4] = x * omc + cos;
	result.data[0 + 1 * 4] = y * x * omc + z * sin;
	result.data[0 + 2 * 4] = x * z * omc - y * sin;
	
	result.data[1 + 0 * 4] = x * y * omc - z * sin;
	result.data[1 + 1 * 4] = y * omc + cos;
	result.data[1 + 2 * 4] = y * z * omc + x * sin;
	
	result.data[2 + 0 * 4] = x * z * omc + y * sin;
	result.data[2 + 1 * 4] = y * z * omc - x * sin;
	result.data[2 + 2 * 4] = z * omc + cos;
	
	return result;
}

Matrix4.translate = function(vec) {
	var result = new Matrix4();
	result.setIdentity();
	if (vec instanceof Vector2) {
		result.data[0 + 3 * 4] = vec.x;
		result.data[1 + 3 * 4] = vec.y;
	} else if (vec instanceof Vector3) {
		result.data[0 + 3 * 4] = vec.x;
		result.data[1 + 3 * 4] = vec.y;
		result.data[2 + 3 * 4] = vec.z;
	} else if (vec instanceof Vector4) {
		result.data[0 + 3 * 4] = vec.x;
		result.data[1 + 3 * 4] = vec.y;
		result.data[2 + 3 * 4] = vec.z;
		result.data[3 + 3 * 4] = vec.w;
	}
	return result;
}

Matrix4.scale = function(vec) {
	var result = new Matrix4();
	result.setIdentity();
	
	if (vec instanceof Vector2) {
		result.data[0 + 0 * 4] = vec.x;
		result.data[1 + 1 * 4] = vec.y;
		
		return result;
	} else if (vec instanceof Vector3) {	
		result.data[0 + 0 * 4] = vec.x;
		result.data[1 + 1 * 4] = vec.y;
		result.data[2 + 2 * 4] = vec.z;
		
		return result;
	} else if (vec instanceof Vector4) {
		result.data[0 + 0 * 4] = vec.x;
		result.data[1 + 1 * 4] = vec.y;
		result.data[2 + 2 * 4] = vec.z;
		result.data[3 + 3 * 4] = vec.w;
		
		return result;
	}
}