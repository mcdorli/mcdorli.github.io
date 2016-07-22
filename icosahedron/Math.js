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
        this.x -= vec.x;
        this.y -= vec.y;
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

Vector2.prototype.clone = function() {
    return new Vector2(this.x, this.y);
}

Vector2.dot = function(vec1, vec2) {
    if (vec1 instanceof Vector2 && vec2 instanceof Vector2) {
        return vec1.x * vec2.x + vec1.y * vec2.y;
    }
}
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
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
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

Vector3.prototype.clone = function() {
    return new Vector3(this.x, this.y, this.z);
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
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        this.w -= vec.w;
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

Vector4.prototype.clone = function() {
    return new Vector4(this.x, this.y, this.z, this.w);
}


Vector4.dot = function(vec1, vec2) {
    if (vec1 instanceof Vector4 && vec2 instanceof Vector4) {
        return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z + vec1.w * vec2.w;
    }
}
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
