// Año en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú mobile
const navToggle = document.getElementById('navToggle');
const navLinksMobile = document.getElementById('navLinksMobile');

navToggle.addEventListener('click', () => {
  const isOpen = navLinksMobile.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Cerrar el menú mobile al elegir una sección
navLinksMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksMobile.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Resaltar el link activo del nav según la sección visible
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('[data-nav]');

const highlightNav = (id) => {
  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      highlightNav(entry.target.id);
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));

// Servicios: click en una tarjeta la expande y oculta las demás
const serviciosGrid = document.getElementById('serviciosGrid');

if (serviciosGrid) {
  const cards = serviciosGrid.querySelectorAll('.servicio-card');

  const closeCards = () => {
    serviciosGrid.classList.remove('has-open');
    cards.forEach(card => {
      card.classList.remove('is-open');
      card.querySelector('.servicio-card__full').hidden = true;
      card.querySelector('.servicio-card__trigger').setAttribute('aria-expanded', 'false');
    });
  };

  const openCard = (card) => {
    serviciosGrid.classList.add('has-open');
    cards.forEach(c => c.classList.toggle('is-open', c === card));
    card.querySelector('.servicio-card__full').hidden = false;
    card.querySelector('.servicio-card__trigger').setAttribute('aria-expanded', 'true');
    card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  serviciosGrid.addEventListener('click', (event) => {
    const trigger = event.target.closest('.servicio-card__trigger');
    const close = event.target.closest('.servicio-card__close');

    if (trigger) {
      openCard(trigger.closest('.servicio-card'));
    } else if (close) {
      closeCards();
    }
  });
}
// Formulario de contacto
// Nota: esto valida y muestra confirmación en pantalla, pero no envía el mail solo.
// Para que llegue de verdad, conectar con un servicio como Formspree, o cambiar
// el <form> para que apunte a ese endpoint con method="POST".
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const servicio = document.getElementById('servicio').value;
  const mensaje = document.getElementById('mensaje').value.trim();

  const subject = encodeURIComponent(`Consulta de ${nombre} — ${servicio}`);
  const body = encodeURIComponent(`${mensaje}\n\nEmail de contacto: ${email}`);

  window.location.href = `mailto:fabri@gmail.com?subject=${subject}&body=${body}`;

  status.textContent = 'Se abrió tu programa de mail para enviar la consulta.';
  form.reset();
});