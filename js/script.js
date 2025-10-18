// Basic site JS: active nav highlighting and simple contact form validation

function initSiteScripts() {
  // Active nav link based on filename
  try {
    const links = document.querySelectorAll('.nav-links a');
    const path = window.location.pathname.split('/').pop();
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === path || (href === 'index.html' && path === '')) {
        a.classList.add('active');
      }
    });
  } catch (e) {
    // ignore
  }

  // Simple contact form submit handler
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      if (!name || !email || !message) return;

      const errors = [];
      if (name.value.trim().length < 2) errors.push('Lütfen geçerli bir isim girin.');
      if (!/.+@.+\..+/.test(email.value.trim())) errors.push('Lütfen geçerli bir e-posta adresi girin.');
      if (message.value.trim().length < 10) errors.push('Mesaj en az 10 karakter olmalıdır.');

      if (errors.length) {
        alert(errors.join('\n'));
        return;
      }

      // If form has an action (e.g., Formspree), submit via fetch to keep user on page and show success
      const formAction = contactForm.getAttribute('action');
      if (formAction) {
        const data = new FormData(contactForm);
        fetch(formAction, { method: contactForm.method || 'POST', body: data, headers: { 'Accept': 'application/json' } })
          .then(res => {
            if (res.ok) return res.json().catch(() => ({}));
            return Promise.reject(res);
          })
          .then(() => {
            const success = document.getElementById('contact-success');
            if (success) { success.style.display = 'block'; }
            contactForm.reset();
          })
          .catch(() => {
            alert('Gönderimde bir hata oldu. Lütfen daha sonra tekrar deneyin.');
          });
        return;
      }

      // Fallback: simple alert
      alert('Mesajınız alındı. Teşekkürler, en kısa sürede dönüş yapacağız.');
      contactForm.reset();
    });
  }

  // read-more removed: full content visible by default
}

// Run init immediately if DOM already loaded (fixes some desktop/Edge race cases), otherwise wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSiteScripts);
} else {
  initSiteScripts();
}

// Footer year auto-update
(function setFooterYear(){
  try {
    const footer = document.querySelector('footer p');
    if (!footer) return;
    const year = new Date().getFullYear();
    footer.innerHTML = footer.innerHTML.replace(/©\s*\d{4}/, '© ' + year);
  } catch (e) { /* ignore */ }
})();
