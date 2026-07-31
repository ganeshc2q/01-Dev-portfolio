const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let W, H, particles = [], lines = [];
const CODE_SNIPPETS = ['const', 'async', '=>', '{}', '[]', 'return', 'import', 'export', 'await', 'function', 'class', 'type', 'interface', '?.', '??', '...', 'void', 'null', '&&', '||'];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function mkParticle() {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
    size: Math.random() * 4 + 9,
    alpha: Math.random() * 0.12 + 0.04,
    type: Math.random() > 0.5 ? 'text' : 'dot',
    r: Math.random() * 2 + 1
  };
}

function init() {
  resize();
  particles = [];
  for (let i = 0; i < 55; i++) particles.push(mkParticle());
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(37,99,235,${0.05 * (1 - dist / 140)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => {
    ctx.globalAlpha = p.alpha;
    if (p.type === 'text') {
      ctx.font = `${p.size}px DM Mono, monospace`;
      ctx.fillStyle = '#2563EB';
      ctx.fillText(p.text, p.x, p.y);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = '#2563EB';
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    p.x += p.vx;
    p.y += p.vy;
    if (p.x < -60) p.x = W + 60;
    if (p.x > W + 60) p.x = -60;
    if (p.y < -20) p.y = H + 20;
    if (p.y > H + 20) p.y = -20;
  });

  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => { resize(); });
init();
draw();
