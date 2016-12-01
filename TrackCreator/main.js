var creator = (function() {
    
    var c, ctx;
    var roadWidth = 15;
    
    var points = [];
    var roadPoints = [];
    var trees = [];
    var spikes = [];
    var checkpoints = [];
    
    var start;
    
    var closed = false;
    
    var selector = document.getElementById("selector");
    var type = document.getElementById("type");
    var angleRange = document.getElementById("angle");
    
    function main() {
        c = document.getElementById("canvas");
        c.width = 600;
        c.height = 600;
        ctx = c.getContext("2d");
        
        c.addEventListener("click", function (e) {
            var x = Math.min(Math.max(e.clientX - this.offsetLeft, roadWidth), c.width - roadWidth);
            var y = Math.min(Math.max(e.clientY - this.offsetTop, roadWidth), c.height - roadWidth);
            console.log(x, y);
            if (!closed) {
                points.push({
                    x: x,
                    y: y
                });
            } else {
                switch (selector.value) {
                    case "tree":
                        trees.push({
                            x: x,
                            y: y
                        });
                        break;
                    case "spike":
                        spikes.push({
                            x: x,
                            y: y
                        });
                        break;
                    case "checkPoint":
                        checkpoints.push({
                            x: x,
                            y: y
                        });
                        break;
                    case "startPoint":
                        start = {
                            x: x,
                            y: y
                        };
                        break;
                }
            }
        });
        
        loop();
    }
    
    function loop() {
        update();
        render();
        requestAnimationFrame(loop);
    }
    
    function update() {
        
    }
    
    function render() {
        ctx.clearRect(0, 0, c.width, c.height);
        
        ctx.fillStyle = "darkgrey";
        ctx.beginPath();
        for (var i = 0; i < roadPoints.length - 2; i ++) {
            ctx.moveTo(roadPoints[i].x, roadPoints[i].y);
            ctx.lineTo(roadPoints[i + 1].x, roadPoints[i + 1].y);
            ctx.lineTo(roadPoints[i + 2].x, roadPoints[i + 2].y);
            ctx.closePath();
        }
        ctx.fill();
        
        ctx.strokeStyle = "black";
        ctx.beginPath();
        for (var i = 0; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
            ctx.arc(points[i].x, points[i].y, 3, 0, 2 * Math.PI);
            ctx.lineTo(points[i].x, points[i].y);
        }
        if (closed)
            ctx.closePath();
        ctx.stroke();
        
        ctx.fillStyle = "darkgreen";
        for (var i = 0; i < trees.length; i++) {
            ctx.fillRect(trees[i].x - 5, trees[i].y - 5, 10, 10);
        }
        
        ctx.fillStyle = "lightgrey";
        for (var i = 0; i < spikes.length; i++) {
            ctx.fillRect(spikes[i].x - 5, spikes[i].y - 5, 10, 10);
        }
        
        ctx.fillStyle = "lightblue";
        for (var i = 0; i < checkpoints.length; i++) {
            ctx.fillRect(checkpoints[i].x - 5, checkpoints[i].y - 5, 10, 10);
        }
        
        if (typeof start !== "undefined") {
            ctx.fillStyle = "red";
            ctx.fillRect(start.x - 5, start.y - 5, 10, 10);
            
            ctx.strokeStyle = "yellow";
            var angle = angleRange.value / 180 * Math.PI;
            ctx.beginPath();
            ctx.lineTo(start.x, start.y);
            ctx.lineTo(start.x + Math.cos(angle) * 20, start.y + Math.sin(angle) * 20);
            ctx.stroke();
        }
    }
    
    main();
    
    return {
        close: function () {
            if (!closed) {
                closed = true;
                
                for (var i = 0; i <= points.length; i++) {
                    var p1 = points[i % points.length];
                    var p2 = points[(i + 1) % points.length];
                    var p3 = points[(i + 2) % points.length];
                    
                    var x1 = p2.x - p1.x;
                    var y1 = p2.y - p1.y;
                    
                    var x2 = p3.x - p2.x;
                    var y2 = p3.y - p2.y;
                    
                    var nAngle1 = Math.atan2(y1, x1) - 0.5 * Math.PI;
                    var nAngle2 = Math.atan2(y2, x2) - 0.5 * Math.PI;
                    
                    if (Math.abs(nAngle1 - nAngle2) > Math.PI)
                        nAngle1 += 2 * Math.PI;
                    
                    var nAngle = (nAngle1 + nAngle2) / 2;
                    
                    var xx = Math.cos(nAngle) * roadWidth;
                    var yy = Math.sin(nAngle) * roadWidth;
                    
                    roadPoints.push({
                        x: p2.x + xx, 
                        y: p2.y + yy
                    }, {
                        x: p2.x - xx,
                        y: p2.y - yy
                    });
                }
            }
            
            document.getElementById("close").style.display = "none";
            document.getElementById("undo").style.display = "none";
            
            selector.style.display = "inline-block";
            type.style.display = "inline-block";
            document.getElementById("save").style.display = "inline-block";
            document.getElementById("label").style.display = "inline-block";
            angleRange.style.display = "inline-block";
        },
        undo: function () {
            if (!closed)
                points.pop();
        },
        save: function () {
            if (typeof start === "undefined") {
                alert("Adj meg egy start poziciót!");
                return;
            }
            
            var newTree = [];
            for (var i = 0; i < trees.length; i++) {
                newTree.push(new Vector2(
                    trees[i].x / c.width - 0.5, 
                    trees[i].y / c.height - 0.5
                ));
            }
            
            var newSpikes = [];
            for (var i = 0; i < spikes.length; i++) {
                newSpikes.push(new Vector2(
                    spikes[i].x / c.width - 0.5, 
                    spikes[i].y / c.height - 0.5
                ));
            }
            
            var newRoad = [];
            for (var i = 0; i < roadPoints.length; i++) {
                newRoad.push(new Vector2(
                    roadPoints[i].x / c.width - 0.5, 
                    roadPoints[i].y / c.height - 0.5
                ));
            }
            
            var newCheckPoint = [];
            for (var i = 0; i < checkpoints.length; i++) {
                newCheckPoint.push(new Vector2(
                    checkpoints[i].x / c.width - 0.5, 
                    checkpoints[i].y / c.height - 0.5
                ));
            }
            var data = {
                mesh: newRoad,
                type: type.value,
                trees: newTree,
                spikes: newSpikes,
                checkpoints: newCheckPoint,
                start: {
                    x: start.x / c.width - 0.5,
                    y: start.y / c.height - 0.5,
                    angle: +angleRange.value
                }
            }
            var d = document.getElementById("download");
            d.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data), "window"));
            d.style.display = "block";
        }
    }
}());
