// Basic site JS: active nav highlighting and simple contact form validation

document.addEventListener('DOMContentLoaded', function () {
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

  // Read-more toggles: direct listeners + delegation
  const readBtns = document.querySelectorAll('.read-more-btn');
  readBtns.forEach(btn => {
    btn.addEventListener('click', toggleReadMore);
  });

  // event delegation as a fallback
  document.addEventListener('click', function (e) {
    const btn = e.target.closest && e.target.closest('.read-more-btn');
    if (btn) toggleReadMore.call(btn, e);
  });

  function toggleReadMore(e) {
    const btn = this;
    const targetId = btn.getAttribute('data-target');
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    const open = target.classList.toggle('open');
    btn.textContent = open ? 'Daha az göster' : 'Daha fazlasını oku';
  }
});
