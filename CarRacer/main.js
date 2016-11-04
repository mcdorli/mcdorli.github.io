var game = (function() {

    var c, ctx;
    
    var scale = {
        x: 480 / 96,
        y: 320 / 64
    };

    var viewHeight = 10;
    
    var car;
    var objects = [];

    var keys = [];

    function main() {
        c = document.getElementById("canvas");
        c.width = 480;
        c.height = 320;
        ctx = c.getContext("2d");
        
        ctx.msImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        
        document.addEventListener("keydown", function (e) {
            keys[e.keyCode] = true;
        });
        document.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
        });
        
        car = new Car(scale);
        
        for (var i = 0; i < 20; i++) {
            objects.push({
                x: Math.random() * 500 - 250,
                y: Math.random() * 500 - 250
            });
        }
        
        loop();
    }
    
    function loop() {
        update();
        render();
        requestAnimationFrame(loop);
    }
    
    function update() {
        car.update(keys);
    }
    
    function render() {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillStyle = "lightgray";
        ctx.fillRect(0, c.height / 2, c.width, 150);
        
        ctx.save();
        ctx.translate(c.width / 2, c.height / 2);
        ctx.fillStyle = "red";
        for (var i = 0; i < objects.length; i++) {
            var p = {
                x: objects[i].x - car.pos.x,
                y: objects[i].y - car.pos.y
            };
            var r = {
                x: Math.cos(car.angle) * p.x - Math.sin(car.angle) * p.y,
                y: Math.sin(car.angle) * p.x + Math.cos(car.angle) * p.y
            }
            var proj = r.y / 100;
            
            if (proj < 0)
                continue;
            
            var size = 10 / proj;
            
            ctx.fillRect(r.x / proj - size / 2, viewHeight / proj - size / 2, size, size);
        }
        ctx.restore();
        
        car.draw(ctx, scale);
        
        /*ctx.save();
        ctx.translate(200, 200);
        ctx.fillStyle = "blue";
        ctx.fillRect(car.pos.x, car.pos.y, 5, 5);
        ctx.fillStyle = "green";
        for (var i = 0; i < objects.length; i++) {
            ctx.fillRect(objects[i].x, objects[i].y, 3, 3);
        }
        ctx.restore();*/
    }
    
    main();
}());
