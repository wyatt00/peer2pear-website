// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Navbar background on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 50;
  nav.style.background = scrolled
    ? getComputedStyle(document.documentElement).getPropertyValue('--nav-bg-scroll').trim()
    : getComputedStyle(document.documentElement).getPropertyValue('--nav-bg').trim();
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Pause animations until visible
document.querySelectorAll('.feature-card, .crypto-card, .algo-card, .team-card, .future-card, .problem-card, .test-card').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// Fetch latest release version from GitHub
fetch('https://api.github.com/repos/zjones2142/Peer2Pear/releases/latest')
  .then(res => res.json())
  .then(data => {
    const tag = data.tag_name;
    const url = data.html_url;
    if (tag) {
      const label = 'Download ' + tag;
      const heroBtn = document.getElementById('heroDownloadBtn');
      const ctaBtn = document.getElementById('ctaDownloadBtn');
      if (heroBtn) { heroBtn.textContent = label; heroBtn.href = url; }
      if (ctaBtn) { ctaBtn.textContent = label; ctaBtn.href = url; }
    }
  })
  .catch(() => {}); // Fallback: buttons keep default text

// Smooth active nav link highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = '#f0f0f0';
      } else {
        link.style.color = '';
      }
    }
  });
});
