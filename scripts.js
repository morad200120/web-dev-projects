// Imposta l'anno corrente nel footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Toggle del tema
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');

  if (isDark) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }

  // Aggiorna le icone
  updateThemeIcons();
}

// Aggiorna le icone del tema
function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const sunIcons = document.querySelectorAll('.fas.fa-sun');
  const moonIcons = document.querySelectorAll('.fas.fa-moon');

  sunIcons.forEach((icon) => {
    if (isDark) {
      icon.classList.remove('hidden');
    } else {
      icon.classList.add('hidden');
    }
  });

  moonIcons.forEach((icon) => {
    if (isDark) {
      icon.classList.add('hidden');
    } else {
      icon.classList.remove('hidden');
    }
  });
}

// Imposta il tema in base alla preferenza salvata
function setThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const html = document.documentElement;

  if (savedTheme === 'light') {
    html.classList.remove('dark');
  } else if (savedTheme === 'dark') {
    html.classList.add('dark');
  } else if (prefersDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  // Aggiorna le icone dopo aver impostato il tema
  updateThemeIcons();
}

// Toggle del menu mobile
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.querySelector('#menu-toggle i');

  mobileMenu.classList.toggle('hidden');

  // Cambia l'icona del menu
  if (mobileMenu.classList.contains('hidden')) {
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  } else {
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
  }
}

// Chiudi il menu mobile quando si clicca su un link
function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.querySelector('#menu-toggle i');

  mobileMenu.classList.add('hidden');
  menuIcon.classList.remove('fa-times');
  menuIcon.classList.add('fa-bars');
}

// Gestione del form di contatto
function handleContactForm(e) {
  e.preventDefault();

  // Ottieni i valori del form
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Validazione semplice
  if (!name || !email || !message) {
    alert('Per favore, compila tutti i campi.');
    return;
  }

  // Simulazione invio (in un'applicazione reale, qui invieresti i dati al server)
  alert(
    `Grazie ${name}! Il tuo messaggio è stato inviato. Ti risponderemo presto all'indirizzo ${email}.`,
  );

  // Reset del form
  e.target.reset();
}

// Smooth scroll per i link di ancoraggio
function handleSmoothScroll(e) {
  e.preventDefault();

  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }

  // Chiudi il menu mobile se è aperto
  closeMobileMenu();
}

// Animazione di entrata per le card dei progetti
function animateOnScroll() {
  const cards = document.querySelectorAll('.card-hover');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    },
  );

  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1
      }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
}

// Inizializzazione quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
  // Imposta il tema all'avvio
  setThemePreference();

  // Event listeners per i pulsanti del tema
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const menuToggle = document.getElementById('menu-toggle');
  const contactForm = document.getElementById('contact-form');

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }

  // Event listeners per i link del menu mobile
  document.querySelectorAll('#mobile-menu a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Event listeners per smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', handleSmoothScroll);
  });

  // Avvia le animazioni
  animateOnScroll();
});

// Listener per i cambiamenti delle preferenze di sistema
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      updateThemeIcons();
    }
  });
