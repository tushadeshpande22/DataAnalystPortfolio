/* ================================
   TUSHA DESHPANDE — PORTFOLIO JS
   ================================ */

// === CUSTOM CURSOR ===
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor scale on hover
document.querySelectorAll('a, button, .tool-chip, .project-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    cursor.style.background = 'transparent';
    cursor.style.border = '1.5px solid #b45a46';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.4)';
    cursorFollower.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = '#b45a46';
    cursor.style.border = 'none';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.opacity = '0.5';
  });
});

// === HERO CANVAS GRID ===
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const dots = [];
const COLS = Math.ceil(window.innerWidth / 60);
const ROWS = Math.ceil(window.innerHeight / 60);

for (let i = 0; i < COLS; i++) {
  for (let j = 0; j < ROWS; j++) {
    dots.push({
      x: i * 60 + 30,
      y: j * 60 + 30,
      baseOpacity: Math.random() * 0.4 + 0.05,
      currentOpacity: 0,
      pulse: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.012
    });
  }
}

let heroMouseX = window.innerWidth / 2;
let heroMouseY = window.innerHeight / 2;

document.getElementById('profile').addEventListener('mousemove', (e) => {
  heroMouseX = e.clientX;
  heroMouseY = e.clientY;
});

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach(dot => {
    dot.pulse += dot.speed;
    const dist = Math.hypot(dot.x - heroMouseX, dot.y - heroMouseY);
    const glowRadius = 180;
    const glow = dist < glowRadius ? (1 - dist / glowRadius) * 0.6 : 0;
    dot.currentOpacity = dot.baseOpacity * (0.5 + 0.5 * Math.sin(dot.pulse)) + glow;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 90, 70, ${dot.currentOpacity})`;
    ctx.fill();
  });
  requestAnimationFrame(drawGrid);
}
drawGrid();

// === TYPEWRITER EFFECT ===
const roles = [
  'Data Analyst',
  'Dashboard Builder',
  'Workflow Automator',
  'AI & DS Graduate',
  'Problem Solver'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.getElementById('roleText');

function typeRole() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    roleEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeRole, 2000);
      return;
    }
  } else {
    roleEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, isDeleting ? 50 : 90);
}
setTimeout(typeRole, 1200);

// === SCROLL REVEAL ===
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// === SKILL BARS ===
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const target = fill.getAttribute('data-width');
      setTimeout(() => {
        fill.style.width = target;
      }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(fill => skillObserver.observe(fill));

// === NAV SCROLL ===
const desktopNav = document.getElementById('desktop-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    desktopNav.classList.add('scrolled');
  } else {
    desktopNav.classList.remove('scrolled');
  }
});

// === HAMBURGER MENU ===
function toggleMenu() {
  const menu = document.getElementById('menuLinks');
  const icon = document.getElementById('hamburgerIcon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  const ham = document.querySelector('.hamburger-menu');
  const menu = document.getElementById('menuLinks');
  if (ham && !ham.contains(e.target)) {
    menu.classList.remove('open');
    document.getElementById('hamburgerIcon').classList.remove('open');
  }
});

// === ACTIVE NAV LINKS ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#b45a46';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));
