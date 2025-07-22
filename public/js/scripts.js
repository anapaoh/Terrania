document.addEventListener("DOMContentLoaded", () => {
    // Scroll suave en anclas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    // Animación fade-bottom al hacer scroll
    const elements = document.querySelectorAll(".fade-bottom");
  
    function checkVisibility() {
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();



    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 10,
        mousewheel: true,
        loop: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 7,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          }
        }
      });
  });  