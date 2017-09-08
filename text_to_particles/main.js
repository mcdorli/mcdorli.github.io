let particles = (function() {
    
    const MAX_FONT_SIZE = 200;
    const TEXT_SIZE = 200;
    
    let c, ctx;
    
    let points = [];
    let point1 = new Vector3(10, 0, 0);
    let point2 = new Vector3(0, 0, 10);
    let angle = 0;
    
    function main() {
        c = document.getElementById("canvas");
        ctx = c.getContext("2d");
        ctx.translate(c.width / 2, c.height / 2);
        
        generate();
        
        loop();
    }
    
    function loop() {
        update();
        render();
        requestAnimationFrame(loop);
    }
    
    function update() {
        angle = 3*Math.PI / 4 + Math.sin(Date.now() / 3000) * Math.PI / 4;
    }
    
    function render() {
        ctx.clearRect(-c.width / 2, -c.height / 2, c.width, c.height)
        for (let p of points) {
            let P = new Vector3(
                p.x * Math.cos(angle) - p.z * Math.sin(angle),
                p.y,
                p.x * Math.sin(angle) + p.z * Math.cos(angle),
            );
            P = P.add(point2);
            P.z /= 10;
            drawQuad(P);
        }
    }
    
    function drawQuad(p) {
        ctx.fillRect((p.x * c.width / 2 - 1) / p.z, (p.y * c.height / 2 - 1) / p.z, 2 / p.z, 2 / p.z);
    }
    
    function getMaxSize(font, text1, text2)  {
        let c = document.createElement("canvas");
        c.width = TEXT_SIZE;
        c.height = TEXT_SIZE;
        let ctx = c.getContext("2d");
        
        let i;
        for (i = 1; i < TEXT_SIZE; i++) {
            ctx.font = i + "px " + font;
            let width1 = ctx.measureText(text1).width;
            let width2 = ctx.measureText(text2).width;
            if (width1 > TEXT_SIZE || width2 > TEXT_SIZE)
                break;
        }
        return i;
    }
    
    function generateText(font, text, size) {
        let c = document.createElement("canvas");
        c.width = TEXT_SIZE;
        c.height = TEXT_SIZE;
        let ctx = c.getContext("2d");
        
        ctx.font = size + "px " + font;
        let width = ctx.measureText(text).width;
        
        ctx.fillText(text, (c.width - width) / 2, (c.height + size / 2) / 2);
        
        return {
            c: c,
            ctx: ctx
        };
    }
    
    function shuffle(array, steps = array.length * 3) {
        for (let i = 0; i < steps; i++) {
            let i1 = Math.random() * array.length | 0;
            let i2 = Math.random() * array.length | 0;
            [array[i1], array[i2]] = [array[i2], array[i1]];
        }
        return array;
    }
    
    function generate() {
            let text1 = document.getElementById("text1").value;
            let text2 = document.getElementById("text2").value;
            let font = document.getElementById("font").value;
            
            let size = getMaxSize(font, text1, text2);
            let t1 = generateText(font, text1, size);
            let t2 = generateText(font, text2, size);
            
            let ctx1 = t1.ctx;
            let ctx2 = t2.ctx;
            
            let data1 = ctx1.getImageData(0, 0, TEXT_SIZE, TEXT_SIZE).data;
            let data2 = ctx2.getImageData(0, 0, TEXT_SIZE, TEXT_SIZE).data;
            
            let p1 = [];
            let p2 = [];
            
            for (let y = 0; y < TEXT_SIZE; y++) {
                p1.push([]);
                p2.push([]);
                for (let x = 0; x < TEXT_SIZE; x++) {
                    let index = (x + y * TEXT_SIZE) * 4;
                    if (data1[index + 3] > 0)
                        p1[y].push(new Vector2(x / TEXT_SIZE - 0.5, y / TEXT_SIZE - 0.5));
                    if (data2[index + 3] > 0)
                        p2[y].push(new Vector2(x / TEXT_SIZE - 0.5, y / TEXT_SIZE - 0.5));
                }
            }
            
            let pairs = [];
            
            for (let y = 0; y < TEXT_SIZE; y++) {
                let a1 = p1[y];
                let a2 = p2[y];
                
                if (a1.length == 0 && a2.length > 0) {
                    a2.push(new Vector2(Math.random() - 0.5, y / TEXT_SIZE - 0.5));
                } else if (a1.length > 0 && a2.length == 0) {
                    a2.push(new Vector2(Math.random() - 0.5, y / TEXT_SIZE - 0.5));
                }
                
                shuffle(a1);
                shuffle(a2);
                while (a1.length > 0 && a2.length > 0) {
                    for (let x = 0; x < Math.min(a1.length, a2.length); x++) {
                        let elem1 = a1.length >= a2.length ? a1[x] : a1[0];
                        let elem2 = a1.length < a2.length ? a2[x] : a2[0];
                        
                        pairs.push({
                            p1: elem1,
                            p2: elem2
                        });
                        if (a1.length >= a2.length) {
                            a1.splice(0, 1);
                        } else {
                            a2.splice(0, 1);
                        }
                    }
                }
            }
            
            points = [];
            for (let pair of pairs) {
                let P1 = new Vector3(0.5, pair.p1.y, -pair.p1.x);
                let P2 = new Vector3(-pair.p2.x, pair.p2.y, 0.5);
                let vec1 = P1.sub(point1).normalize();
                let vec2 = P2.sub(point2).normalize();
                let newP1 = P1.add(vec1.mul(1 - P2.x - 0.5));
                let newP2 = P2.add(vec2.mul(1 - P1.z - 0.5));
                let P = newP1.add(newP2).div(2);
                points.push(P);
            }
            
        }
    
    main();
    
    return {
        generate: generate
    };
        
}());
