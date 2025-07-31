// Simple fade-in animation para las cards al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.marca-card');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
  
    cards.forEach(card => {
      card.classList.add('invisible');
      observer.observe(card);
    });
  });  