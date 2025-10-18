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

      // For now, just show a success message. In production you'd POST to a server.
      alert('Mesajınız alındı. Teşekkürler, en kısa sürede dönüş yapacağız.');
      contactForm.reset();
    });
  }
});
