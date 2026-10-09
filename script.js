// --- 1. Modo Oscuro / Modo Claro ---
const themeToggleBtn = document.getElementById('theme-toggle');

// Leer preferencia guardada del navegador
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  themeToggleBtn.textContent = '🌙';
} else {
  themeToggleBtn.textContent = '☀️';
}

// Evento al dar clic al botón de tema
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');

  const isLight = document.body.classList.contains('light-mode');

  if (isLight) {
    themeToggleBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    themeToggleBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
});

// --- 2. Formulario de contacto con AJAX / Fetch ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('form-submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formStatus.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';
        formStatus.classList.add('success');
        contactForm.reset();
      } else {
        const errorData = await response.json();
        formStatus.textContent = errorData.errors 
          ? errorData.errors.map(err => err.message).join(', ') 
          : 'Ocurrió un error al enviar el mensaje.';
        formStatus.classList.add('error');
      }
    } catch (error) {
      formStatus.textContent = 'Error de conexión. Intenta de nuevo más tarde.';
      formStatus.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar Mensaje';
    }
  });
}
