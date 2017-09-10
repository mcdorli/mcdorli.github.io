// Shim
a = document.getElementById("canvas");
b = document.body;
c = a.getContext("2d");
d = document;

// End of shim

E=0,
(f = q => {
    for (
        s = (a, b = a) => ({
            x: a,
            y: b
        }),
        M = [...Array(33)].map((q, y) => [...Array(33)].map((q, x) => x % 2 & y % 2)),
        J = s(1.5),
        L = R = 1,
        u = v = 32,
        p = s(3),
        C = (a, b) => s(a.x + b.x, a.y + b.y),
        o = (a, b) => s(a.x / b, a.y / b),
        h = (p, i = 1) => [s(-2, 0), s(2, 0), s(0, -2), s(0, 2)].filter(e => g(C(p, e)) == i),
        t = p => s(Math.cos(p), Math.sin(p)),
        g = p => (M[p.y | 0] || 0)[p.x | 0] | 0,
        S = (a, b) => M[a.y|0][a.x|0] = b; S(p, 2);) {
        (A = h(p))[m = B = 0] ? j = C(p, A[Math.random() * A.length | 0]) : B = 1;
        if (B) {
            for (x = 0; x < u; x++)
                for (y = 0; y < v; y++)
                    g(s(x + 1, y + 1))-1 || !h(D = s(x + 1, y + 1), 2)[0] || (p = C(h(D = s(x + 1, y + 1), 2)[0], j = D), m = x = y = u);
            if (!m) break
        }
        S(o(C(p, p = j), 2), 2)
    }
    u=1, v=5    
    for (x = 0; x < u; x++)
        for (y = 0; y < v; y++)
            S(s(Math.random()*32|0*2+1,Math.random()*32|0*2+1),3)
})();
k = [];
u = "down";
d.addEventListener("key" + u, (e) => k[e.keyCode] = 1);
u = "up";
d.addEventListener("key" + u, (e) => k[e.keyCode] = 0);
setInterval(() => {
    g(J)-3||(S(J,2),E++);
    
    i = 36;
    d = o(t(L), 30);
    T = 6e-2;
    if (k[++i]) L += -T;
    if (k[++i] && g(n = C(J, d))) J = n;
    if (k[++i]) L += T;
    d = o(d, -1);
    if (k[++i] && g(n = C(J, d))) J = n;
    J.x + J.y < 62||!E||E%5||f() ;
    c.fillStyle = "#24f";
    c.fillRect(0, 0, u = 400, u);
    c.fillStyle = "#333";
    c.fillRect(0, h = 200, u, h);
    v = 2e4;
    for (x = 0; x < u; x++)
        for (y = 0; y < v; y++)
        z = C(J, o(t(L + (x - h) / u * R), 240 / y)), 
        g(z) && g(z)!=3 || (c.fillStyle = ["#999", "#bbb", "#ddd"][(z.x + z.y) % 3 | 0],
        g(z)-3||(c.fillStyle="#0f0"),
        c.fillRect(x++, h - u / y / 1e-2 / 2, 2, u / y / 1e-2), y = v);
    u = v = 33;
    for (x = 0; x < u; x++)
        for (y = 0; y < v; y++)
            c.fillStyle = ["#000","#fff","#fff","#0f0"][M[y][x]], c.fillRect(x * 3, y * 3, 3, 3);
    c.fillStyle = "#f00";
    c.fillText("Score: " + E, 9, 370);
    c.fillRect(J.x * 3 - 1, J.y * 3 - 1, 3, 3);
    c.fillRect(93, 93, 3, 3);
}, 16)
