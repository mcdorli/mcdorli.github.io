function Triangle(pos1, pos2, pos3, scale) {
    this.pos1 = pos1.normalize().multiply(scale);
    this.pos2 = pos2.normalize().multiply(scale);
    this.pos3 = pos3.normalize().multiply(scale);
    this.scale = scale;
    
    var v1 = this.pos1.clone().subtract(this.pos2);
    var v2 = this.pos3.clone().subtract(this.pos2);
    
    this.avg = this.pos1.clone().add(this.pos2).add(this.pos3).divide(3);
    
    this.normal = Vector3.cross(v2, v1);
    this.normal.normalize();
}

Triangle.prototype.draw = function(perspectiveFactor, light, ctx) {
    var proj1 = (this.pos1.z + perspectiveFactor) / perspectiveFactor;
    var proj2 = (this.pos2.z + perspectiveFactor) / perspectiveFactor;
    var proj3 = (this.pos3.z + perspectiveFactor) / perspectiveFactor;
    
    var brightness = Math.floor(Vector3.dot(this.normal, light) * 40 + 40);
    var color = "hsl(0, 0%, " + brightness + "%)";
    
    
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineTo(this.pos1.x / proj1, this.pos1.y / proj1);
    ctx.lineTo(this.pos2.x / proj2, this.pos2.y / proj2);
    ctx.lineTo(this.pos3.x / proj3, this.pos3.y / proj3);
    ctx.closePath();    
    ctx.fill();
    ctx.stroke();
}

Triangle.prototype.rotate = function(x, y, z) {
    var rotX = Matrix3.rotate(x, 1, 0, 0);
    var rotY = Matrix3.rotate(y, 0, 1, 0);
    var rotZ = Matrix3.rotate(z, 0, 0, 1);
    
    var rot = rotZ.multiplyMatrix(rotY.multiplyMatrix(rotX));
    this.pos1 = rot.multiplyVector(this.pos1);
    this.pos2 = rot.multiplyVector(this.pos2);
    this.pos3 = rot.multiplyVector(this.pos3);
    
    this.avg = this.pos1.clone().add(this.pos2).add(this.pos3).divide(3);
    
    var v1 = this.pos1.clone().subtract(this.pos2);
    var v2 = this.pos3.clone().subtract(this.pos2);
    
    this.normal = Vector3.cross(v2, v1);
    this.normal.normalize();
};

Triangle.prototype.subdivide = function() {
    var v12 = new Vector3(0, 0, 0);
    var v23 = new Vector3(0, 0, 0);
    var v31 = new Vector3(0, 0, 0);
    
    var prop = ["x", "y", "z"]
    
    for (var i = 0; i < 3; i++) {
        var p = prop[i];
        v12[p] = this.pos1[p] + this.pos2[p];
        v23[p] = this.pos2[p] + this.pos3[p];
        v31[p] = this.pos3[p] + this.pos1[p];
    }
    
    v12.normalize().multiply(this.scale);
    v23.normalize().multiply(this.scale);
    v31.normalize().multiply(this.scale);
    
    return [
        new Triangle(this.pos1, v12, v31, this.scale), 
        new Triangle(this.pos2, v23, v12, this.scale),
        new Triangle(this.pos3, v31, v23, this.scale), 
        new Triangle(v12, v23, v31, this.scale)
    ];
};
