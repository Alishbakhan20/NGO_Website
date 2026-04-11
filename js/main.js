// Replace this empty string with your copied Google Apps Script Web App URL
const SCRIPT_URL = '';
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for Animated Stats counter
  const stats = document.querySelectorAll('.stat-counter');
  let hasAnimated = false;
  if (stats.length > 0) {
    const animateStats = () => {
      stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps approx
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
    if(statsSection) {
        observer.observe(statsSection);
    }
  }
  // Generalized Form Submission Handler
  function setupForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!SCRIPT_URL) {
          alert("DEVELOPER WARNING: Please set the SCRIPT_URL in js/main.js to your actual Google Apps Script Web App URL to enable form data saving.");
          return;
      }
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      submitBtn.disabled = true;
      const formData = new FormData(form);
      
      try {
        const response = await fetch(SCRIPT_URL, {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        
        if (result.result === 'success') {
          let msg = "Thank you! Your submission has been received.";
          if (formId === 'internshipForm') msg = "Thank you! Your application has been received. We will contact you soon.";
          else if(formId === 'donateForm') msg = "Thank you for your generous donation! We will send a confirmation to your email shortly.";
          
          alert(msg);
          form.reset();
        } else {
          alert("There was an error processing your request on the server. Please try again.");
        }
      } catch (error) {
        console.error('Error!', error.message);
        alert("Network error. Please try again later or check your connection.");
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
  // csrForm is intentionally excluded — it submits directly to Google Forms via action= in csr.html
  setupForm('internshipForm');
  setupForm('donateForm');
});
