// ==========================================
// 1. MODO OSCURO / MODO CLARO (CON PERSISTENCIA)
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');

// Recuperar preferencia guardada previamente
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  if (themeToggleBtn) {
    themeToggleBtn.textContent = '🌙';
  }
} else {
  if (themeToggleBtn) {
    themeToggleBtn.textContent = '☀️';
  }
}

// Alternar entre temas al hacer clic
if (themeToggleBtn) {
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
}

// ==========================================
// 2. FORMULARIO DE ATENCIÓN Y REPORTE CIUDADANO (AJAX / FETCH)
// ==========================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('form-submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);

    // Estado visual de envío en curso
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando reporte ciudadano...';
    }
    if (formStatus) {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        if (formStatus) {
          formStatus.textContent = '¡Reporte recibido correctamente! La dirección correspondiente dará seguimiento.';
          formStatus.classList.add('success');
        }
        contactForm.reset();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.errors 
          ? errorData.errors.map(err => err.message).join(', ') 
          : 'Ocurrió un error al enviar el reporte. Verifique los campos.';
        
        if (formStatus) {
          formStatus.textContent = errorMessage;
          formStatus.classList.add('error');
        }
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = 'Error de conexión. Intente comunicarse directamente a los teléfonos del palacio.';
        formStatus.classList.add('error');
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Reporte Ciudadano';
      }
    }
  });
}
