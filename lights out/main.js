let game = (function() {
    
    let settings = [
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 0],
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2],
        [1, 1, 0, 0, 0, 1, 0, 0, 2, 2, 0, 0, 0, 2],
        [1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 1, 0, 0, 2, 2, 0, 0, 0, 2],
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 0],
    ];
    
    function main() {
        buttons.innerHTML = "";
        
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 14; x++) {
                let but = document.createElement("input");
                but.type = "button";
                but.className = "a" + settings[y][x] + " but";
                but.id = x + ";" + y;
                but.value = x + y * 14;
                
                buttons.appendChild(but);
                
                but.onclick = click;
            }
            buttons.appendChild(document.createElement("br"));
        }
    }
    
    function click() {
        let pos = this.id.split(";");
        let x = pos[0];
        let y = pos[1];
        increaseClass(x, y);
        if (x > 0)
            increaseClass(x - 1, y);
        if (x < 13)
            increaseClass(+x + 1, y);
        if (y > 0)
            increaseClass(x, y - 1);
        if (y < 8)
            increaseClass(x, +y + 1);
        output.innerHTML += this.value + ", ";
    };
    
    function increaseClass(x, y) {
        let element = document.getElementById(x + ";" + y);
        element.className = "a" + ((element.className[1] + 1) % 3) + " but";
    }
    
    main();
    
    return {
        reset: function() {
            main();
        },
        click: click
    }
}());
