// You can add animation or future scroll effects here
 document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Contact form feedback
    document.querySelector('.contact-form').addEventListener('submit', function (e) {
      e.preventDefault();
      alert("Thank you, your message has been sent!");
      this.reset();
    });

    // Reveal slides on scroll
    

  const slides = document.querySelectorAll('.slide');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // Reset animation when not visible
      }
    });
  }, {
    threshold: 0.2
  });

  slides.forEach(slide => {
    observer.observe(slide);
  });