const navbar = document.getElementById("mainNavbar");
let lastScrollTop = 0;
const offset = 300;

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > offset) {
    navbar.classList.add("navbar-hidden");
  } else {
    navbar.classList.remove("navbar-hidden");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
