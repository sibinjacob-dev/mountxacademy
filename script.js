document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("mainNav");
  const backToTop = document.getElementById("backToTop");
  const navCollapseElement = document.getElementById("navbarMenu");
  const navLinks = document.querySelectorAll("#navbarMenu .nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const currentYear = document.getElementById("currentYear");

  currentYear.textContent = new Date().getFullYear();

  const updateOnScroll = () => {
    const scrollPosition = window.scrollY;
    navbar.classList.toggle("scrolled", scrollPosition > 30);
    backToTop.classList.toggle("visible", scrollPosition > 500);

    let currentSection = "home";
    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop - 140) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  };

  updateOnScroll();
  window.addEventListener("scroll", updateOnScroll, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (
        window.innerWidth < 992 &&
        navCollapseElement.classList.contains("show")
      ) {
        bootstrap.Collapse.getOrCreateInstance(navCollapseElement).hide();
      }
    });
  });

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }
});
