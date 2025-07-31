
 document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
      });
    });
    document.querySelector('.contact-form').addEventListener('submit', function (e) {
      e.preventDefault();

      const name = this.querySelector('input[name="name"]').value.trim();
      const email = this.querySelector('input[name="email"]').value.trim();
      const mobile = this.querySelector('input[name="mobile"]').value.trim();
      const message = this.querySelector('textarea[name="message"]').value.trim();

    
      const nameRegex = /^[A-Za-z\s]+$/;
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      const mobileRegex = /^[6-9]\d{9}$/;

      if (!nameRegex.test(name)) {
        alert("Please enter a valid name (letters and spaces only).");
        return;
      }
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (!mobileRegex.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }
      if (message.length === 0) {
        alert("Please enter your message.");
        return;
      }

    
      
      alert("Sorry, there was a problem sending your message.");
    
    });

  
    
 

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