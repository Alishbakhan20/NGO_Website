// ============================================================
// AVABODH Foundation — main.js
// All 5 forms (CSR, Internship, Donate, Contact, NGO) submit
// directly to Google Forms via fetch + no-cors in their own
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------------------------
  // Animated Stats Counter (used on index.html)
  // -----------------------------------------------
  const stats = document.querySelectorAll('.stat-counter');
  let hasAnimated = false;

  if (stats.length > 0) {
    const animateStats = () => {
      stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            stat.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            stat.innerText = target + "+";
          }
        };
        updateCounter();
      });
      hasAnimated = true;
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        animateStats();
      }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

});
