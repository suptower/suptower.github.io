// Theme toggle
const toggle = document.getElementById('toggleTheme');
toggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  toggle.textContent = document.documentElement.classList.contains('light') ? 'Dark' : 'Light';
});

// Canvas background
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let DPR = window.devicePixelRatio || 1;

function getParticleColor(alpha) {
  const isLight = document.documentElement.classList.contains('light');
  return isLight ? `rgba(106,75,255,${alpha})` : `rgba(127,92,255,${alpha})`;
}

function resize() {
  canvas.width = innerWidth * DPR;
  canvas.height = innerHeight * DPR;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.scale(DPR, DPR);
}

window.addEventListener('resize', () => {
  DPR = window.devicePixelRatio || 1;
  resize();
});
resize();

const particles = [];
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: 1 + Math.random() * 3,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: 0.1 + Math.random() * 0.3,
  });
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0) p.x = innerWidth;
    if (p.x > innerWidth) p.x = 0;
    if (p.y < 0) p.y = innerHeight;
    if (p.y > innerHeight) p.y = 0;

    ctx.beginPath();
    ctx.fillStyle = getParticleColor(p.alpha);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(tick);
}

tick();

// Preview 3D tilt effect
const tilt = document.getElementById('tiltPreview');

tilt.addEventListener('mousemove', (e) => {
  const rect = tilt.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  tilt.style.transform = `perspective(900px) rotateX(${(-y * 10) + 4}deg) rotateY(${x * 10}deg) translateY(-6px)`;
});

tilt.addEventListener('mouseleave', () => {
  tilt.style.transform = 'perspective(900px) rotateX(6deg) rotateY(-6deg)';
});

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.style.opacity = 1;
      else e.target.style.opacity = 0.6;
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.card, .hero-card').forEach((node) => {
  node.style.opacity = 0;
  io.observe(node);
});
