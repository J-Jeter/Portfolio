// === Theme Toggle (works everywhere) ===
const toggleBtn = document.getElementById("theme-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
  });
}

// === SPA Navigation (only runs on main.html) ===
const navLinks = document.querySelectorAll(".nav-links a[data-section]");
const sections = document.querySelectorAll(".main-section");

if (navLinks.length > 0 && sections.length > 0) {
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("data-section");
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        // Hide all sections
        sections.forEach(sec => sec.classList.remove("active", "fade"));

        // Show target section with fade
        targetEl.classList.add("active");
        setTimeout(() => targetEl.classList.add("fade"), 50);

        // Update active link
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });
}

// === Scroll Highlight (optional, only main.html) ===
if (sections.length > 0) {
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 60;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("data-section") === current) {
        link.classList.add("active");
      }
    });
  });
}

// === Contact Form (only main.html) ===
const form = document.querySelector("form");
const formMessage = document.getElementById("form-message");

if (form && formMessage) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    formMessage.style.display = "block";
    formMessage.className = "";
    formMessage.textContent = "Sending...";

    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formMessage.textContent = "Thank you! Your message has been sent.";
        formMessage.classList.add("success");
        form.reset();
      } else {
        formMessage.textContent = "Oops! Something went wrong. Please try again.";
        formMessage.classList.add("error");
      }
    } catch (err) {
      formMessage.textContent = "Network error. Please check your connection.";
      formMessage.classList.add("warning");
    }
  });
}
