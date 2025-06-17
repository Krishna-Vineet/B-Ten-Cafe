// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 300);
  }, 500);
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
// Load saved theme from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.setAttribute("data-theme", "dark");
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
} else {
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
themeToggle.addEventListener("click", () => {
  if (body.getAttribute("data-theme") === "dark") {
    body.removeAttribute("data-theme");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("theme", "light");
  } else {
    body.setAttribute("data-theme", "dark");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", "dark");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document
  .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
  .forEach((el) => {
    observer.observe(el);
  });

// Counter animation for stats
const counters = document.querySelectorAll(".stat-number");
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target.toString().includes(".")
              ? target
              : target.toLocaleString();
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current).toLocaleString();
          }
        }, 20);

        countObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => {
  countObserver.observe(counter);
});

// Add hover effect to testimonial cards
document.querySelectorAll(".testimonial-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Mobile menu functionality (if needed)
let mobileMenuOpen = false;

// Add some interactive particles effect on hero section
function createParticle() {
  const hero = document.querySelector(".hero");
  const particle = document.createElement("div");
  particle.style.position = "absolute";
  particle.style.width = "4px";
  particle.style.height = "4px";
  particle.style.background = "rgba(255, 255, 255, 0.5)";
  particle.style.borderRadius = "50%";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.pointerEvents = "none";
  particle.style.animation = "float 6s linear infinite";

  hero.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 6000);
}

// Create floating particles
setInterval(createParticle, 3000);

// Add CSS for floating animation
const style = document.createElement("style");
style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Add some micro-interactions
document.querySelectorAll(".btn, .cta-btn, .order-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px) scale(1.05)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Easter egg: Konami code
let konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];
let userInput = [];

document.addEventListener("keydown", (e) => {
  userInput.push(e.code);
  if (userInput.length > konamiCode.length) {
    userInput.shift();
  }

  if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
    // Easter egg activated!
    document.body.style.animation = "rainbow 2s linear infinite";
    setTimeout(() => {
      document.body.style.animation = "";
    }, 5000);
  }
});

const rainbowStyle = document.createElement("style");
rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
document.head.appendChild(rainbowStyle);
