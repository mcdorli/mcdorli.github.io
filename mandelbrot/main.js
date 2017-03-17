var mandelbrot = (function() {
    
    var canvas, ctx;
    var MAX_ITERATION = 200;
    var scale = 2;
    
    var offset = {
        x: 0.001643721971153, 
        y: -0.822467633298876
    };
    
    function main() {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        
        /*canvas.addEventListener("click", function (e) {
            offset = {
                x: (e.clientX - canvas.width / 2) / canvas.width * scale + offset.x,
                y: (e.clientY - canvas.height / 2) / canvas.height * scale + offset.y
            };
            render();
        });*/
        
        setInterval(function () {
            scale /= 1.05;
            render();
        }, 100);
        
        render();
    }
    
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        var colors = [];
        var histogram = [];
        
        
        var x, y, i;
        for (x = 0; x < canvas.width; x++) {
            for (y = 0; y < canvas.height; y++) {
                var z = complex(0, 0);
                var c = complex(
                    (x - canvas.width / 2) / canvas.width * scale + offset.x,
                    (y - canvas.height / 2) / canvas.height * scale + offset.y
                );
                
                for (i = 0; i < MAX_ITERATION && z.x * z.x + z.y * z.y < 2 * 2; i++) {
                    z = add(sq(z), c);
                }
                histogram[i] = histogram[i] ? histogram[i] : 0;
                histogram[i]++;
                colors.push(i);
            }
        }
        var max = 0;
        var min = histogram.length - 1;
        
        for (i = 1; i < histogram.length - 1; i++) {
            if (histogram[i - 1] == undefined && histogram[i] != undefined)
                min = i;
            if (histogram[i] != undefined && histogram[i + 1] == undefined)
                max = i;
        }
        
        var data = ctx.createImageData(canvas.width, canvas.height);
        
        var total = 0;
        for (var i = 0; i < MAX_ITERATION; i++) {
            total += histogram[i] || 0;
        }
        
        for (x = 0; x < canvas.width; x++) {
            for (y = 0; y < canvas.height; y++) {
                var c = colors[y + x * data.width]
                
                var hue = 0;
                for (var i = 0; i < c; i++) {
                    hue += histogram[i] / total || 0;
                }
                
                hue = 255 - hue * 255;
                
                data = plot(data, x, y, {
                    r: 0,
                    g: hue,
                    b: hue,
                    a: 255
                });
            }
        }
        ctx.putImageData(data, 0, 0);
    }
    
    function complex(x, y) {
        return {
            x: x,
            y: y
        };
    }
        
    function copy(comp) {
        return {
            x: comp.x,
            y: comp.y
        };
    }
    
    function sq(a) {
        return {
            x: a.x * a.x - a.y * a.y,
            y: 2 * a.x * a.y
        };
    }
    
    function add(a, b) {
        return {
            x: a.x + b.x,
            y: a.y + b.y
        };
    }
    
    function plot(data, x, y, color) {
        data.data[(y * data.width + x) * 4 + 0] = color.r;
        data.data[(y * data.width + x) * 4 + 1] = color.g;
        data.data[(y * data.width + x) * 4 + 2] = color.b;
        data.data[(y * data.width + x) * 4 + 3] = color.a;
        return data;
    }
    
    main();
    
    return {
        zoom: function (i) {
            scale *= i;
            render();
        }
    };
}());
