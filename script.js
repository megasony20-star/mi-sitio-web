// --- 1. Modo Oscuro / Modo Claro con Persistencia en localStorage ---
const themeToggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

// Comprobar estado previo guardado
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  themeToggleBtn.textContent = '🌙';
} else {
  themeToggleBtn.textContent = '☀️';
}

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

// --- 2. Manejo Asíncrono del Reporte Ciudadano (Formspree AJAX) ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('form-submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando reporte...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = '¡Reporte recibido con éxito! La dirección correspondiente dará seguimiento.';
        formStatus.classList.add('success');
        contactForm.reset();
      } else {
        const errorData = await response.json();
        formStatus.textContent = errorData.errors 
          ? errorData.errors.map(err => err.message).join(', ') 
          : 'Ocurrió un error al enviar el formulario.';
        formStatus.classList.add('error');
      }
    } catch (error) {
      formStatus.textContent = 'Error de conexión. Puede comunicarse a los teléfonos del palacio.';
      formStatus.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar Reporte Ciudadano';
    }
  });
}
