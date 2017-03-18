var snowflake = (function() {
    
    var c, ctx;
    
    var directions = "frrfrrfrr";
    var turnAngle = Math.PI / 3;
    var forward;
    
    var level = 0;
    
    var angle = 0;
    var pos;
    
    function main() {
        c = document.getElementById("canvas");
        ctx = c.getContext("2d");
        
        forward = c.width / 5 * 3;
        
        advance();
        
        render();
    }
    
    function render() {
        pos = {
            x: c.width / 2 - forward * Math.pow(3, level) / 2,
            y: c.height / 2 + Math.sqrt(3) * forward * Math.pow(3, level) / 6
        }
        
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.lineTo(pos.x, pos.y);
        for (var i = 0; i < directions.length; i++) {
            switch (directions[i]) {
                case "f":
                    move();
                    ctx.lineTo(pos.x, pos.y);
                    break;
                case "r":
                    angle -= turnAngle;
                    break;
                case "l":
                    angle += turnAngle;
                    break;
            }
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    function move() {
        pos.x += Math.cos(angle) * forward;
        pos.y += Math.sin(angle) * forward;
    }
    
    main();
        
    function advance() {
        directions = directions.replace(/f/g, "flfrrflf");
        forward /= 3;
        level++;
        render();
    }
        
    return {
        advance: advance
    };
    
}());
