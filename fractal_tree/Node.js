function Node(position, angle) {
	this.pos = position;
	this.angle = angle;
	this.parent = null;
	this.generated = false;
}

Node.prototype.setParent = function(node) {
	this.parent = node;
}

Node.prototype.generate = function(angleStep, length, offsetAngle) {
	var angle1 = this.angle - angleStep / 2 + offsetAngle;
	var angle2 = this.angle + angleStep / 2 + offsetAngle;
	var pos1 = new Vector2(Math.cos(angle1) * length + this.pos.x, Math.sin(angle1) * length + this.pos.y);
	var pos2 = new Vector2(Math.cos(angle2) * length + this.pos.x, Math.sin(angle2) * length + this.pos.y);
	var node1 = new Node(pos1, angle1);
	var node2 = new Node(pos2, angle2);
	node1.setParent(this);
	node2.setParent(this);
	this.generated = true;
	return [node1, node2];
}