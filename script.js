// NAV scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));

// CARROSSEL
const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.dot');
const progress = document.getElementById('carouselProgress');
const TOTAL = 3, DURATION = 5000;
let current = 0, autoTimer, progressTimer, pw = 0;

function goTo(i) {
  current = ((i % TOTAL) + TOTAL) % TOTAL;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, j) => d.classList.toggle('active', j === current));
  resetProgress();
}

function resetProgress() {
  clearInterval(progressTimer);
  pw = 0;
  progress.style.width = '0%';
  const step = 100 / (DURATION / 50);
  progressTimer = setInterval(() => {
    pw += step;
    progress.style.width = Math.min(pw, 100) + '%';
  }, 50);
}

function startAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(current + 1), DURATION);
}

document.getElementById('prevBtn').addEventListener('click', () => { goTo(current - 1); startAuto(); });
document.getElementById('nextBtn').addEventListener('click', () => { goTo(current + 1); startAuto(); });
dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.index); startAuto(); }));

// Swipe support
let tx = 0;
track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; });
track.addEventListener('touchend', e => {
  const diff = tx - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) { goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
});

resetProgress();
startAuto();

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// MODAL DE IMAGEM
// MODAL DE IMAGEM
const imagens = document.querySelectorAll(".projeto-img");
const modal = document.getElementById("modalImagem");
const imgGrande = document.getElementById("imgGrande");
const fechar = document.querySelector(".fechar");

imagens.forEach(img => {
  img.addEventListener("click", function() {
    modal.style.display = "block";
    imgGrande.src = this.src;
  });
});

fechar.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});