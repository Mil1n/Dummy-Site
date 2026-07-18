const revealElements = document.querySelectorAll('.reveal');
const sectionLinks = document.querySelectorAll('.nav__links a[href^="#"]');
const statusDate = document.querySelector('[data-status-date]');

if (statusDate) {
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(today);

  statusDate.textContent = formattedDate;
  statusDate.dateTime = today.toISOString().slice(0, 10);
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealElements.forEach((element) => revealObserver.observe(element));

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      sectionLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.toggleAttribute('aria-current', isActive);
      });
    });
  }, { rootMargin: '-42% 0px -48% 0px', threshold: 0.01 });

  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));

    if (section) {
      navObserver.observe(section);
    }
  });
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
