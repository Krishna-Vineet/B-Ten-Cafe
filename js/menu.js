// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector(".theme-toggle i");

  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    themeIcon.className = "fas fa-moon";
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.className = "fas fa-sun";
    localStorage.setItem("theme", "light");
  }
}

// Load saved theme
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme");
  const themeIcon = document.querySelector(".theme-toggle i");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeIcon.className = "fas fa-moon";
  }

  // Initialize animations
  initializeAnimations();
  initializeNavigation();
});

// Smooth scrolling for navigation
function initializeNavigation() {
  const categoryNav = document.getElementById("categoryNav");
  const categoryPills = document.querySelectorAll(".category-pill");

  // Show/hide category nav on scroll
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > window.innerHeight * 0.5) {
      categoryNav.classList.add("visible");
    } else {
      categoryNav.classList.remove("visible");
    }

    // Update active category
    updateActiveCategory();
  });

  // Smooth scroll to sections
  categoryPills.forEach((pill) => {
    pill.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offset = 160; // Account for sticky header and nav
        const targetPosition = targetSection.offsetTop - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Update active category based on scroll position
function updateActiveCategory() {
  const sections = document.querySelectorAll(".menu-section");
  const categoryPills = document.querySelectorAll(".category-pill");

  let currentSection = "";
  const scrollPos = window.pageYOffset + 200;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  categoryPills.forEach((pill) => {
    pill.classList.remove("active");
    if (pill.getAttribute("data-section") === currentSection) {
      pill.classList.add("active");
    }
  });
}

// Initialize scroll animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "-50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("section-title")) {
          entry.target.classList.add("animate-in");
        }
        if (entry.target.classList.contains("section-subtitle")) {
          entry.target.classList.add("animate-in");
        }
        if (entry.target.classList.contains("menu-card")) {
          const cards =
            entry.target.parentElement.querySelectorAll(".menu-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("animate-in");
            }, index * 100);
          });
        }
        if (entry.target.classList.contains("combo-card")) {
          entry.target.classList.add("animate-in");
        }
      }
    });
  }, observerOptions);

  // Observe elements
  document
    .querySelectorAll(".section-title, .section-subtitle")
    .forEach((el) => {
      observer.observe(el);
    });

  document.querySelectorAll(".menu-grid").forEach((grid) => {
    const firstCard = grid.querySelector(".menu-card");
    if (firstCard) {
      observer.observe(firstCard);
    }
  });

  document.querySelectorAll(".combo-card").forEach((card) => {
    observer.observe(card);
  });

  document.querySelectorAll(".review-card").forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// Add loading animation for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('img[loading="lazy"]');

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "0";
      this.style.transition = "opacity 0.3s ease";
      setTimeout(() => {
        this.style.opacity = "1";
      }, 100);
    });
  });
});

// Add ripple effect to buttons
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("card-button")) {
    const button = e.target;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

// Add CSS for ripple animation
const style = document.createElement("style");
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Heart toggle function for enhanced cards
function toggleHeart(button) {
  const icon = button.querySelector("i");
  button.classList.toggle("active");

  if (button.classList.contains("active")) {
    icon.className = "fas fa-heart";
    button.style.color = "var(--primary)";
  } else {
    icon.className = "far fa-heart";
    button.style.color = "var(--text-gray)";
  }
}

// Animate donation banner elements on page load
document.addEventListener("DOMContentLoaded", function () {
  // Add this to your existing DOMContentLoaded event listener
  const donateElements = document.querySelectorAll(
    "#donate-banner h2, #donate-banner p, .donate-btn"
  );
  donateElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, (index + 1) * 300);
  });
});
