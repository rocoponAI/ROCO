document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     Header Scroll Effect
     ========================================================================== */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });

  /* ==========================================================================
     Mobile Menu
     ========================================================================== */
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  const toggleMenu = () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.setAttribute('aria-hidden', isExpanded);
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  };

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger.getAttribute('aria-expanded') === 'true') {
        toggleMenu();
      }
    });
  });

  /* ==========================================================================
     FAQ Accordion
     ========================================================================== */
  const faqButtons = document.querySelectorAll('.faq__question-btn');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const answerId = button.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);

      // Close other FAQs
      faqButtons.forEach(otherButton => {
        if (otherButton !== button) {
          otherButton.setAttribute('aria-expanded', 'false');
          const otherAnswerId = otherButton.getAttribute('aria-controls');
          document.getElementById(otherAnswerId).hidden = true;
        }
      });

      button.setAttribute('aria-expanded', !isExpanded);
      answer.hidden = isExpanded;
    });
  });

  /* ==========================================================================
     Intersection Observer for Fade-in Animations
     ========================================================================== */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.problem-card, .service-card, .work-card, .price-card, .flow__step, .faq__item'
  );

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // CSS for Intersection Observer
  const style = document.createElement('style');
  style.textContent = `
    .in-view {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});
