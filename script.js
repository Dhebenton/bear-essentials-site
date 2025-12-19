document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initMobileSliders();
  initFAQ();
});

/* Flickity */

function initCarousels() {
  const carousel = document.querySelector('.carousel');
  const progressBar = document.querySelector('.progress');

  if (carousel && progressBar) {
    const flktyA = new Flickity(carousel, {
      cellAlign: 'left',
      contain: true,
      draggable: true,
      prevNextButtons: false,
      pageDots: false
    });

    progressBar.style.width = '0%';

    flktyA.on('ready', () => {
      progressBar.style.width = '0%';
    });

    flktyA.on('scroll', progress => {
      const clamped = Math.max(0, Math.min(1, progress));
      progressBar.style.width = clamped * 100 + '%';
    });
  }

  const carouselDots = document.querySelector('.carousel-dots');
  if (carouselDots) {
    new Flickity(carouselDots, {
      cellAlign: 'left',
      contain: true,
      draggable: true,
      prevNextButtons: false,
      pageDots: false
    });
  }
}

/* Mobile sliders */

function initMobileSliders() {
  const bp = 735;
  const sliders = [
    { selector: '.value-prop-wrap', instance: null },
    { selector: '.categories-grid', instance: null }
  ];

  function update() {
    sliders.forEach(slider => {
      const el = document.querySelector(slider.selector);
      if (!el) return;

      if (window.innerWidth < bp && !slider.instance) {
        slider.instance = new Flickity(el, {
          cellAlign: 'left',
          contain: true,
          draggable: true,
          prevNextButtons: false,
          pageDots: true
        });
      }

      if (window.innerWidth >= bp && slider.instance) {
        slider.instance.destroy();
        slider.instance = null;
      }
    });
  }

  update();
  window.addEventListener('resize', update);
}

/* FAQ */

function initFAQ() {
  const faqs = document.querySelectorAll('.faq');
  if (!faqs.length) return;

  const first = faqs[0];
  first.classList.add('open');

  const firstContent = first.querySelector('.faq-question-wrap');
  if (firstContent) {
    firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
  }

  faqs.forEach(faq => {
    faq.addEventListener('mouseenter', () => {
      faqs.forEach(f => {
        f.classList.remove('open');
        const wrap = f.querySelector('.faq-question-wrap');
        if (wrap) wrap.style.maxHeight = null;
      });

      faq.classList.add('open');
      const content = faq.querySelector('.faq-question-wrap');
      if (content) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}
