var icosahedron = new function() {
    
    var c, ctx;
    var size = 500;
    
    var perspectiveFactor = 400;
    
    var triangles = [];
    var scale = 150;
    
    var light = new Vector3(1, 1, 1).normalize();
    
    var X = 0.525731112119133606;
    var Z = 0.85065080835203993;
    
    vertices = [   
        [-X, 0.0, Z], [X, 0.0, Z], [-X, 0.0, -Z], [X, 0.0, -Z],    
        [0.0, Z, X], [0.0, Z, -X], [0.0, -Z, X], [0.0, -Z, -X],    
        [Z, X, 0.0], [-Z, X, 0.0], [Z, -X, 0.0], [-Z, -X, 0.0] 
    ];
    
    indices = [ 
        [0, 4, 1], [0, 9, 4], [9, 5, 4], [4, 5, 8], [4, 8, 1],    
        [8, 10, 1], [8, 3, 10], [5, 3, 8], [5, 2, 3], [2, 7, 3],    
        [7, 10, 3], [7, 6, 10], [7, 11, 6], [11, 0, 6], [0, 1, 6], 
        [6, 1, 10], [9, 0, 11], [9, 11, 2], [9, 2, 5], [7, 2, 11] 
    ];
    
    function main() {
        c = document.getElementById("canvas");
        c.width = size;
        c.height = size;
        ctx = c.getContext("2d");
        
        ctx.translate(size / 2, size / 2);
        
        for (var i = 0; i < indices.length; i++) {
            var ind = indices[i];
            triangles.push(new Triangle(
                new Vector3(vertices[ind[0]][0], vertices[ind[0]][1], vertices[ind[0]][2]),
                new Vector3(vertices[ind[1]][0], vertices[ind[1]][1], vertices[ind[1]][2]),
                new Vector3(vertices[ind[2]][0], vertices[ind[2]][1], vertices[ind[2]][2]),
                scale
            ));
        }
        loop();
    }
    
    function loop() {
        update();
        render();
        requestAnimationFrame(loop);
    }
    
    function update() {
        for (var i = 0; i < triangles.length; i++) {
            var a = Math.PI / 180;
            triangles[i].rotate(a / 4, a, a / 2);
        }
        
        triangles.sort(function(a, b) {
            return b.avg.z - a.avg.z;
        })
    }
    
    function render() {
        ctx.clearRect(-size / 2, -size / 2, size, size);
        
        for (var i = 0; i < triangles.length; i++) {
            triangles[i].draw(perspectiveFactor, light, ctx);
        }
    }
    
    this.subdivide = function() {
        var newTriangles = [];
        for (var i = 0; i < triangles.length; i++) {
            newTriangles = newTriangles.concat(triangles[i].subdivide());
        }
        triangles = newTriangles;
        console.log(triangles.length);
    }
    
    main();
}
