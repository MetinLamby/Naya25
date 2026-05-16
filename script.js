const slides = Array.from(document.querySelectorAll('.slide'));
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
let currentSlide = 0;
const finalSlideIndex = slides.length - 1;

function showSlide(index) {
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === index;
    slide.classList.toggle('active', isActive);

    const card = slide.querySelector('.slide-card');
    if (card) {
      if (isActive) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    }
  });

  if (index <= 0) {
    prevButton.disabled = true;
    prevButton.classList.add('disabled');
  } else {
    prevButton.disabled = false;
    prevButton.classList.remove('disabled');
  }

  if (index === finalSlideIndex) {
    nextButton.textContent = 'Celebrate! 🎉';
  } else {
    nextButton.textContent = 'Next →';
  }
}

function createConfetti() {
  const finalSlide = slides[finalSlideIndex];
  const confetti = document.createElement('div');
  confetti.className = 'confetti';

  const colors = ['#ff8fa3', '#ffd6e6', '#8ad7ff', '#d3f0ff', '#ffe3a3'];
  for (let i = 0; i < 24; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = `${Math.random() * 10 + 8}px`;
    piece.style.height = `${Math.random() * 18 + 10}px`;
    piece.style.animationDuration = `${Math.random() * 0.8 + 1.2}s`;
    piece.style.animationDelay = `${Math.random() * 0.3}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.appendChild(piece);
  }

  finalSlide.appendChild(confetti);
  setTimeout(() => confetti.remove(), 1800);
}

function advanceSlide() {
  if (currentSlide === finalSlideIndex) {
    currentSlide = 0;
  } else {
    currentSlide += 1;
  }

  showSlide(currentSlide);

  if (currentSlide === finalSlideIndex) {
    createConfetti();
  }
}

function retreatSlide() {
  if (currentSlide > 0) {
    currentSlide -= 1;
    showSlide(currentSlide);
  }
}

prevButton.addEventListener('click', retreatSlide);
nextButton.addEventListener('click', advanceSlide);
window.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
});
