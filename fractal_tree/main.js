var tree = new function() {
	
	var c, ctx;
	var size = 500;
	var nodes = [];
	var currentGeneration = 0;
	
	function main() {
		c = document.getElementById("canvas");
		c.width = size;
		c.height = size;
		ctx = c.getContext("2d");
		
		nodes.push(new Node(new Vector2(size / 2, size / 4 * 3), -0.5 * Math.PI));
		
		loop();
	}
	
	function loop() {
		update();
		render();
		window.requestAnimationFrame(loop);
	}
	
	function update() {
		nodes = [];
		nodes.push(new Node(new Vector2(size / 2, size / 4 * 3), -0.5 * Math.PI));
		var angleStep = document.getElementById("angle").value;
		var angleOffset = document.getElementById("angleOffset").value;
		var length = document.getElementById("length").value;
		var treeSize = document.getElementById("treeSize").value;
		for (var i = 0; i < treeSize; i++) {
			var temp = nodes.slice();
			for (var j = 0; j < nodes.length; j++) {
				if (!nodes[j].generated) {
					temp.push(...nodes[j].generate(angleStep / 180 * Math.PI, length / (i + 1), angleOffset / 180 * Math.PI))
				}
			}
			nodes = temp;
		}
	}
	
	function render() {
		ctx.clearRect(0, 0, c.width, c.height);
		ctx.strokeStyle = "black";
		ctx.beginPath();
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			ctx.moveTo(node.pos.x, node.pos.y);
			ctx.arc(node.pos.x, node.pos.y, 1, 0, 2 * Math.PI);
			if (node.parent != null) {
				ctx.moveTo(node.pos.x, node.pos.y);
				ctx.lineTo(node.parent.pos.x, node.parent.pos.y);
			}
		}
		ctx.stroke();
	}
	
	main();
};