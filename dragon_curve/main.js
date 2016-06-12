var dragonCurve = new function() {
    
    var c, ctx;
    var size = 500;
    
    var curve = [1];
    var startLevel = 7;
    var segmentLength = 10;
    
    var sL = document.getElementById("segmentLength");
    
    // LEFT - 0, RIGHT - 1
    
    this.generate = function() {
        var temp = curve.slice();
        temp = temp.reverse();
        for (var i in temp) {
            temp[i] = Math.abs(temp[i] - 1);
        }
        
        curve = curve.concat(1, temp);
    }
    
    this.main = function() {
        c = document.getElementById("canvas");
        c.width = size;
        c.height = size;
        ctx = c.getContext("2d");
        
        for (var i = 0; i < startLevel; i++) {
            this.generate();
        }
        
        ctx.translate(size / 2, size / 2);
        ctx.lineWidth = 1;
        
        loop();
    }
    
    function loop() {
        update();
        render();
        window.requestAnimationFrame(loop);
    }
    
    function update() {
        segmentLength = sL.value;
    }
    
    function render() {
        ctx.clearRect(-size / 2, -size / 2, size, size);
                
        var pos = {x: 0, y: 0};
        var angle = 0;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        for (var i in curve) {
            pos.x += Math.cos(angle) * segmentLength;
            pos.y += Math.sin(angle) * segmentLength;
            ctx.lineTo(pos.x, pos.y);
            if (curve[i]) {
                angle += 0.5 * Math.PI;
            } else {
                angle -= 0.5 * Math.PI;
            }
        }
        ctx.stroke();
    }
};

dragonCurve.main();