function Car(scale) {
    this.pos = {
        x: 0,
        y: 0
    };
    this.angle = 0;
    
    this.wheel = new Image();
    this.wheel.src = "wheel.png";
    
    this.view = new Image();
    this.view.src = "view.png";
    
    this.angularSpeed = 0;
    this.wheelAngle = 0;
    this.wheelSize = {
        x: 29 * scale.x,
        y: 28 * scale.y
    };
    this.speed = 0;
}

Car.prototype.update = function (keys) {
    if (keys[65]) {
        // A
        this.angularSpeed -= 0.01;
    } else if (keys[68]) {
        // D
        this.angularSpeed += 0.01;
    } else {
        this.wheelAngle *= 0.95;
    }
    
    this.wheelAngle += this.angularSpeed;
    this.angularSpeed *= 0.9;
    
    if (keys[87]) {
        // W
        this.speed += 0.1;
    }
    if (keys[83]) {
        // S
        this.speed -= 0.05;
    }
    this.angle += this.wheelAngle / 200 * this.speed;
    this.speed = Math.max(Math.min(this.speed, 2), -1);
    this.pos.x += Math.cos(-this.angle + 0.5 * Math.PI) * this.speed;
    this.pos.y += Math.sin(-this.angle + 0.5 * Math.PI) * this.speed;
    this.speed *= 0.95;
    
    this.wheelAngle = Math.max(Math.min(this.wheelAngle, Math.PI), -Math.PI);
};

Car.prototype.draw = function (ctx, scale) {
    ctx.drawImage(this.view, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(20 * scale.x + this.wheelSize.x / 2, 35 * scale.y + this.wheelSize.y / 2);
    ctx.rotate(this.wheelAngle);
    ctx.drawImage(this.wheel, -this.wheelSize.x / 2, -this.wheelSize.y / 2, this.wheelSize.x, this.wheelSize.y);
    ctx.restore();
};
