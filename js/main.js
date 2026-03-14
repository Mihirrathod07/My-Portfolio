/* ═══════════════════════════════════════════════════════════
   MIHIR RATHOD — PORTFOLIO JAVASCRIPT
   File: js/main.js
   Edit freely — each section is clearly labeled!
═══════════════════════════════════════════════════════════ */


/* ───────────────────────────────────────
   1. MATRIX RAIN ANIMATION
   (Background falling characters)
─────────────────────────────────────── */
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
let cols, drops;

function initMatrix() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  cols  = Math.floor(canvas.width / 18);
  drops = Array(cols).fill(1);
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(10,10,10,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Characters to use in the rain
  const chars = 'アイウエオカキクケコ01ABCDabcd';

  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillStyle  = Math.random() > 0.95 ? '#ffffff' : '#00ff41';
    ctx.globalAlpha = Math.random() * 0.5 + 0.1;
    ctx.font = '14px Share Tech Mono';
    ctx.fillText(char, i * 18, y * 18);
    ctx.globalAlpha = 1;

    if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}

initMatrix();
setInterval(drawMatrix, 60); // Speed of matrix rain (lower = faster)
window.addEventListener('resize', initMatrix);


/* ───────────────────────────────────────
   2. TYPED TEXT EFFECT
   (Hero subtitle cycling text)
   Add/remove phrases in the array below!
─────────────────────────────────────── */
const phrases = [
  'Cybersecurity Researcher',
  'Ethical Hacker',
  'OSINT Specialist',
  'Penetration Tester',
  'CTF Enthusiast',
  'SOC Analyst',
];

let pIdx     = 0;
let cIdx     = 0;
let deleting = false;

const typedEl = document.getElementById('typed');

function typeLoop() {
  const current = phrases[pIdx];

  if (!deleting) {
    // Typing forward
    typedEl.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 2000); // Pause before deleting
      return;
    }
  } else {
    // Deleting
    typedEl.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 50 : 80); // Typing speed
}

typeLoop();


/* ───────────────────────────────────────
   3. SCROLL PROGRESS BAR
   (Green line at top of page)
─────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const scrolled  = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const pct       = (scrolled / maxScroll) * 100;
  document.getElementById('scrollLine').style.width = pct + '%';
});


/* ───────────────────────────────────────
   4. FADE-UP ON SCROLL
   (Elements animate in when visible)
─────────────────────────────────────── */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


/* ───────────────────────────────────────
   5. HERO RIGHT PANEL — LIVE TERMINAL
─────────────────────────────────────── */
(function () {
  var el = document.getElementById('heroTermBody');
  if (!el) return;

  /* All the "lines" to show, in order */
  var lines = [
    { ms: 300,   color: '#00ffff', text: '$ nmap -sV -T4 192.168.1.1' },
    { ms: 900,   color: '#6aa66a', text: 'Starting Nmap 7.94...' },
    { ms: 1500,  color: '#c8ffc8', text: 'PORT      STATE  SERVICE' },
    { ms: 2000,  color: '#00ff41', text: '22/tcp    open   ssh' },
    { ms: 2350,  color: '#00ff41', text: '80/tcp    open   http' },
    { ms: 2700,  color: '#ffcc00', text: '443/tcp   open   https' },
    { ms: 3100,  color: '#ff2244', text: '3306/tcp  open   mysql  ⚠' },
    { ms: 3700,  color: '#6aa66a', text: 'Nmap done — 4 ports open' },
    { ms: 4500,  color: '',        text: '' },
    { ms: 4600,  color: '#00ffff', text: '$ osint --target domain.io' },
    { ms: 5300,  color: '#6aa66a', text: '[*] Pulling WHOIS info...' },
    { ms: 5900,  color: '#c8ffc8', text: 'Registrar : GoDaddy LLC' },
    { ms: 6300,  color: '#ffcc00', text: '[!] 3 subdomains found' },
    { ms: 6700,  color: '#00ff41', text: '  → admin.domain.io' },
    { ms: 7000,  color: '#00ff41', text: '  → api.domain.io' },
    { ms: 7300,  color: '#00ff41', text: '  → dev.domain.io' },
    { ms: 8000,  color: '',        text: '' },
    { ms: 8100,  color: '#00ffff', text: '$ splunk search "failed_login"' },
    { ms: 8900,  color: '#6aa66a', text: '[*] Querying 24h logs...' },
    { ms: 9600,  color: '#ff2244', text: '[!] 47 failed attempts — brute?' },
    { ms: 10200, color: '#ffcc00', text: '[!] IP flagged → alert sent' },
    { ms: 10900, color: '#00ff41', text: '[✓] Incident logged to SOC' },
    { ms: 11700, color: '',        text: '' },
    { ms: 11800, color: '#6aa66a', text: '// All scans complete.' },
    { ms: 12400, color: '#00ff41', text: '$ _' },
  ];

  var TOTAL = 12400 + 3200; /* restart after this ms */

  function addLine(line) {
    var d = document.createElement('div');
    d.style.cssText = [
      'font-family:Share Tech Mono,monospace',
      'font-size:0.74rem',
      'line-height:1.85',
      'white-space:pre',
      'color:' + (line.color || 'transparent'),
      'opacity:0',
      'transition:opacity 0.3s ease',
    ].join(';');
    d.textContent = line.text || '\u00a0';
    el.appendChild(d);
    /* force repaint then fade in */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { d.style.opacity = '1'; });
    });
    /* keep terminal tidy — max 14 lines visible */
    while (el.children.length > 14) el.removeChild(el.firstChild);
    el.scrollTop = el.scrollHeight;
  }

  function runScript() {
    /* clear old lines */
    el.innerHTML = '';
    lines.forEach(function (line) {
      setTimeout(function () { addLine(line); }, line.ms);
    });
    setTimeout(runScript, TOTAL);
  }

  runScript();
}());

/* ───────────────────────────────────────
   6. PROTECTION — Right Click & Shortcuts
─────────────────────────────────────── */

// Disable right click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});

// Disable keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl+U — View Source
  if (e.ctrlKey && e.key === 'u') { e.preventDefault(); return false; }
  // Ctrl+S — Save page
  if (e.ctrlKey && e.key === 's') { e.preventDefault(); return false; }
  // Ctrl+Shift+I — DevTools
  if (e.ctrlKey && e.shiftKey && e.key === 'I') { e.preventDefault(); return false; }
  // Ctrl+Shift+J — Console
  if (e.ctrlKey && e.shiftKey && e.key === 'J') { e.preventDefault(); return false; }
  // Ctrl+Shift+C — Inspect
  if (e.ctrlKey && e.shiftKey && e.key === 'C') { e.preventDefault(); return false; }
  // F12 — DevTools
  if (e.key === 'F12') { e.preventDefault(); return false; }
});