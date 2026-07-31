const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('slideDots');
const prevBtn = document.getElementById('slidePrev');
const nextBtn = document.getElementById('slideNext');
const slideshow = document.getElementById('heroSlideshow');

let current = 0;
let autoTimer = null;
let dragStartX = 0;
let isDragging = false;
let dragDelta = 0;

function createDots() {
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'slide-dot' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    btn.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(btn);
  });
}

function updateDots() {
  document.querySelectorAll('.slide-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

function goTo(index, direction) {
  const prev = current;
  current = (index + slides.length) % slides.length;
  if (prev === current) return;

  slides[prev].classList.remove('active');
  slides[prev].style.transform = '';
  if (direction === 'left') {
    slides[prev].style.transform = 'translateX(-60px)';
    slides[prev].style.opacity = '0';
  } else {
    slides[prev].style.transform = 'translateX(60px)';
    slides[prev].style.opacity = '0';
  }

  setTimeout(() => {
    slides[prev].classList.remove('active');
    slides[prev].style.transform = '';
    slides[prev].style.opacity = '';
  }, 320);

  slides[current].style.opacity = '0';
  slides[current].style.transform = direction === 'left' ? 'translateX(60px)' : 'translateX(-60px)';
  slides[current].classList.add('active');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      slides[current].style.opacity = '1';
      slides[current].style.transform = 'translateX(0)';
    });
  });

  updateDots();
}

function next() { goTo(current + 1, 'left'); }
function prev() { goTo(current - 1, 'right'); }

function startAuto() {
  stopAuto();
  autoTimer = setInterval(next, 4200);
}

function stopAuto() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
}

prevBtn.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
nextBtn.addEventListener('click', () => { next(); stopAuto(); startAuto(); });

slideshow.addEventListener('mousedown', e => {
  isDragging = true;
  dragStartX = e.clientX;
  dragDelta = 0;
  slideshow.classList.add('dragging');
  stopAuto();
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  dragDelta = e.clientX - dragStartX;
});

document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  slideshow.classList.remove('dragging');
  if (dragDelta < -50) { next(); }
  else if (dragDelta > 50) { prev(); }
  startAuto();
});

slideshow.addEventListener('touchstart', e => {
  dragStartX = e.touches[0].clientX;
  dragDelta = 0;
  stopAuto();
}, { passive: true });

slideshow.addEventListener('touchmove', e => {
  dragDelta = e.touches[0].clientX - dragStartX;
}, { passive: true });

slideshow.addEventListener('touchend', () => {
  if (dragDelta < -50) { next(); }
  else if (dragDelta > 50) { prev(); }
  startAuto();
});

slides.forEach((slide, i) => {
  if (i !== 0) {
    slide.style.opacity = '0';
    slide.style.transform = 'translateX(60px)';
  }
});

createDots();
startAuto();

slideshow.addEventListener('mouseenter', stopAuto);
slideshow.addEventListener('mouseleave', startAuto);
