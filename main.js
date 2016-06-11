(function cube() {
    
    var c, ctx;
    var size = 500;
    var cubeSize = size / 2;
    
    var rotation1 = document.getElementById("rotYZ");
    var rotation2 = document.getElementById("rotXZ");
    var rotation3 = document.getElementById("rotXY");
    var rotation4 = document.getElementById("rotXW");
    var rotation5 = document.getElementById("rotYW");
    var rotation6 = document.getElementById("rotZW");
    
    var tesseract = {
        A: new Vector4(-0.5, -0.5, -0.5, -0.5),
        B: new Vector4( 0.5, -0.5, -0.5, -0.5),
        C: new Vector4( 0.5, -0.5,  0.5, -0.5),
        D: new Vector4(-0.5, -0.5,  0.5, -0.5),
        E: new Vector4(-0.5,  0.5, -0.5, -0.5),
        F: new Vector4( 0.5,  0.5, -0.5, -0.5),
        G: new Vector4( 0.5,  0.5,  0.5, -0.5),
        H: new Vector4(-0.5,  0.5,  0.5, -0.5),
        
        I: new Vector4(-0.5, -0.5, -0.5,  0.5),
        J: new Vector4( 0.5, -0.5, -0.5,  0.5),
        K: new Vector4( 0.5, -0.5,  0.5,  0.5),
        L: new Vector4(-0.5, -0.5,  0.5,  0.5),
        M: new Vector4(-0.5,  0.5, -0.5,  0.5),
        N: new Vector4( 0.5,  0.5, -0.5,  0.5),
        O: new Vector4( 0.5,  0.5,  0.5,  0.5),
        P: new Vector4(-0.5,  0.5,  0.5,  0.5)
    };
    
    var combinations = "AB,BC,CD,DA,EF,FG,GH,HE,AE,BF,CG,DH,IJ,JK,KL,LI,MN,NO,OP,PM,IM,JN,KO,LP,AI,BJ,CK,DL,EM,FN,GO,HP".split(",");
    for (var i in combinations) {
        combinations[i] = combinations[i].split("");
    }
    
    var angle = [0, 0, 0, 0, 0, 0];
    var deltaA = Math.PI / 180;
    
	function main() {
        c = document.getElementById("canvas");
        c.width = size;
        c.height = size;
        ctx = c.getContext("2d");
        
        ctx.translate(size / 2, size / 2);
        
        ctx.strokeStyle="#00aa00";
        ctx.lineWidth = 4;
        
        loop();
    }
    
    function loop() {
        update();
        render();
        window.requestAnimationFrame(loop);
    }
    
    function update() {
        /*angle[0] += rotation1.value / 180 * Math.PI;
        angle[1] += rotation2.value / 180 * Math.PI;
        angle[2] += rotation3.value / 180 * Math.PI;
        angle[3] += rotation4.value / 180 * Math.PI;
        angle[4] += rotation5.value / 180 * Math.PI;
        angle[5] += rotation6.value / 180 * Math.PI;*/
        
        angle[0] = rotation1.value / 180 * Math.PI;
        angle[1] = rotation2.value / 180 * Math.PI;
        angle[2] = rotation3.value / 180 * Math.PI;
        angle[3] = rotation4.value / 180 * Math.PI;
        angle[4] = rotation5.value / 180 * Math.PI;
        angle[5] = rotation6.value / 180 * Math.PI;
        
    }
    
    function render() {
        ctx.clearRect(-size / 2, -size / 2, size, size);
        
        var rX = Matrix4.rotate(angle[0], 1, 0, 0, 0);
        var rY = Matrix4.rotate(angle[1], 0, 1, 0, 0);
        var rZ = Matrix4.rotate(angle[2], 0, 0, 1, 0);
        
        var rXW = new Matrix4();
        rXW.setIdentity();
        rXW.data[0 + 0 * 4] = Math.cos(angle[3]);
        rXW.data[0 + 3 * 4] = Math.sin(angle[3]);
        rXW.data[3 + 0 * 4] = -Math.sin(angle[3]);
        rXW.data[3 + 3 * 4] = Math.cos(angle[3]);
        
        var rYW = new Matrix4();
        rYW.setIdentity();
        rYW.data[1 + 1 * 4] = Math.cos(angle[4]);
        rYW.data[1 + 3 * 4] = -Math.sin(angle[4]);
        rYW.data[3 + 1 * 4] = Math.sin(angle[4]);
        rYW.data[3 + 3 * 4] = Math.cos(angle[4]);
        
        var rZW = new Matrix4();
        rZW.setIdentity();
        rZW.data[2 + 2 * 4] = Math.cos(angle[5]);
        rZW.data[2 + 3 * 4] = -Math.sin(angle[5]);
        rZW.data[3 + 2 * 4] = Math.sin(angle[5]);
        rZW.data[3 + 3 * 4] = Math.cos(angle[5]);
        
        var temp = {};
        for (var key in tesseract) {
            temp[key] = rXW.multiplyVector(rYW.multiplyVector(rZW.multiplyVector(rZ.multiplyVector(rY.multiplyVector(rX.multiplyVector(tesseract[key]))))));
        }
        
        ctx.beginPath();
        for (var combination of combinations) {
            var p1 = temp[combination[0]];
            var p2 = temp[combination[1]];
            
            var proj1 = (p1.z + 1.5);
            var proj2 = (p2.z + 1.5);
            
            ctx.moveTo(p1.x * cubeSize / proj1, p1.y * cubeSize / proj1);
            ctx.lineTo(p2.x * cubeSize / proj2, p2.y * cubeSize / proj2);
        }
        
        ctx.stroke();
    }
    main();
})();