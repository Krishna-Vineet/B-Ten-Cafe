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
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

const formObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("slide-in-left");
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll(".contact-card").forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
  observer.observe(card);
});

// Observe job cards
document.querySelectorAll(".job-card").forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
  observer.observe(card);
});

formObserver.observe(document.querySelector(".contact-form"));

// Form Handling
const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  setTimeout(() => {
    // Show success message
    successMessage.classList.add("show");

    // Reset form
    contactForm.reset();

    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Hide success message after 3 seconds
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 3000);
  }, 1500);
});

// Smooth scrolling for navigation
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

// Add parallax effect to hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.getElementById("reach-hero");
  if (hero && scrolled < hero.offsetHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Input focus effects
document.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)";
  });
});
