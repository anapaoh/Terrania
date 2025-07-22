  document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-right");
  
    const onScroll = () => {
      const triggerBottom = window.innerHeight * 0.85;
  
      elements.forEach((el) => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
          el.classList.add("visible");
        }
      });
    };
  
    window.addEventListener("scroll", onScroll);
    onScroll();
  });
  