// Cacao Studio / Valeria Ocaña — Site behavior

document.addEventListener('DOMContentLoaded', function() {
  var mobileMenuButton = document.getElementById('mobile-menu-button');
  var mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    });
  });

  // Fade-in on scroll
  var observerOptions = { threshold: 0.08, rootMargin: '0px 0px -40px 0px' };
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, observerOptions);
  document.querySelectorAll('section, .card-premium, .stat-card').forEach(function(el) {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Header: transparent/soft at top, solid on scroll
  var navbar = document.querySelector('nav');
  if (navbar) {
    function updateNavbar() {
      if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
    }
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();
  }

  // Escape closes mobile menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
  });

  // Form submit (placeholder — set form action for Formspree/Netlify/etc.)
  document.querySelectorAll('form[data-contact]').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      // If form has no action, prevent default for now
      if (!form.getAttribute('action') || form.getAttribute('action') === '#') {
        e.preventDefault();
        console.log('Contact form: add action URL for submission');
      }
    });
  });

  // Lazy load images with data-src
  var imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });
  document.querySelectorAll('img[data-src]').forEach(function(img) { imageObserver.observe(img); });
});
