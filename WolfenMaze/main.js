// Shim

a = document.getElementById("canvas");
b = document.body;
c = a.getContext("2d");
d = document;

// End of shim

g = p => (M[p.y | 0] || 0)[p.x | 0] | 0;
S = (a, b) => M[a.y][a.x] = b;
s = (a, b = a) => ({
  x: a,
  y: b
});
C = (a, b) => s(a.x + b.x, a.y + b.y);
o = (a, b) => s(a.x / b, a.y / b);
h = (p, i = 1) => [s(-2, 0), s(2, 0), s(0, -2), s(0, 2)].filter(e => g(C(p, e)) == i);
t = p => s(Math.cos(p), Math.sin(p));
E = 0;
(f = q => {
  M = [...Array(33)].map((q, y, A) => A.map((q, x) => !((x - 3) % 2 | (y - 3) % 2)));
  J = s(1.5);
  L = R = 1;
  p = s(3);
  u = v = 32;
  for (;;) {
    S(p, 2);
    A = h(p);
    A[m = B = 0] ? j = C(p, A[Math.random() * A.length | 0]) : B = 1;
    if (B) {
      for (y = 0; y < v; y += 2)
        for (x = 0; x < u; x += 2) g(s(x + 1, y + 1)) == 1 && (I = h(D = s(x + 1, y + 1), 2)[0]) && (p = C(I, j = D), m = x = y = u);
      if (!m) break
    }
    S(o(C(p, j), 2), 2);
    p = j
  }
})();
k = [];
u = "down";
d.addEventListener("key" + u, (e) => k[e.keyCode] = 1);
u = "up";
d.addEventListener("key" + u, (e) => k[e.keyCode] = 0);
setInterval(() => {
  i = 36;
  d = o(t(L), 30);
  T = 6e-2;
  if (k[++i]) L += -T;
  if (k[++i] && g(n = C(J, d))) J = n;
  if (k[++i]) L += T;
  d = o(d, -1);
  if (k[++i] && g(n = C(J, d))) J = n;
  if (J.x + J.y > 61) f(), E += 5;
  c.fillStyle="#24f"
  c.fillRect(0, 0, 400, 400);
  c.fillStyle = "#333";
  c.fillRect(0, 200, 400, 200);
  u=400
  for (x = 0; x < u; x += 3) {
    r = J;
    a = L + (x - 200) / 400 * R;
    l = 0;
    v = 2e4;
    for (y = 0; y < v; y++) l += 1e-2, r = C(r, o(t(a), 240)), g(r) || (c.fillStyle = ["#999", "#bbb", "#ddd"][(r.x + r.y) % 3 | 0], c.fillRect(x, 200 - 400 / l / 2, 3, 400 / l), y = v)
  }
  u = v = 33;
  for (y = 0; y < v; y++)
    for (x = 0; x < u; x++) c.fillStyle = !M[y][x] ? "#000" : "#fff", c.fillRect(x * 3, y * 3, 3, 3);
  x = J.x * 3, y = J.y * 3;
  c.fillStyle = "#f00";
  c.fillText("Score: " + E, 9, 370);
  c.fillRect(x - 1, y - 1, 3, 3);
  c.fillRect(93, 93, 3, 3);
  c.fillRect((w = C(s(x, y), o(t(L), 0.3))).x, w.y, 2, 2);
}, 16)
