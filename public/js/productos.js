function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
  
    reveals.forEach((element) => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 100;
  
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);  