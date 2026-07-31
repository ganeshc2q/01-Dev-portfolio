const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const revealTargets = document.querySelectorAll(
  '.section-header, .interest-card, .skill-cat, .edu-item, .exam-card, ' +
  '.achievement-card, .challenge-card, .platform-card, .freelance-card, ' +
  '.store-card, .session-card, .highlight-item, .about-highlights, ' +
  '.ty-content, .cinfo-item'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      const delay = (Array.from(revealTargets).indexOf(entry.target) % 6) * 70;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => revealObserver.observe(el));

function handleBuy(name, price) {
  const toast = document.getElementById('cartToast');
  const msg = document.getElementById('cartToastMsg');
  msg.textContent = `"${name}" — $${price} · Opening checkout...`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

window.handleBuy = handleBuy;

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const resetFormBtn = document.getElementById('resetFormBtn');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const phone = document.getElementById('cphone').value.trim();
  const type = document.getElementById('ctype').value;
  const date = document.getElementById('cdate').value;
  const budget = document.getElementById('cbudget').value;
  const message = document.getElementById('cmessage').value.trim();
  const newsletter = document.getElementById('cnewsletter').checked;

  const missing = [];
  if (!fname) missing.push('First Name');
  if (!lname) missing.push('Last Name');
  if (!email) missing.push('Email');
  if (!type) missing.push('Enquiry Type');
  if (!message) missing.push('Message');

  if (missing.length) {
    alert('Please fill in the required fields:\n• ' + missing.join('\n• '));
    return;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const toEmail = 'alex@alexmorgandev.com';
  const subject = encodeURIComponent(`[Portfolio] ${type} — ${fname} ${lname}`);

  let body = `Hi Alex,\n\n`;
  body += `You have a new enquiry from your portfolio website.\n\n`;
  body += `────────────────────────────\n`;
  body += `CONTACT INFORMATION\n`;
  body += `────────────────────────────\n`;
  body += `Name: ${fname} ${lname}\n`;
  body += `Email: ${email}\n`;
  if (phone) body += `Phone: ${phone}\n`;
  body += `\nEnquiry Type: ${type}\n`;
  if (date) body += `Preferred Date: ${date}\n`;
  if (budget) body += `Budget Range: ${budget}\n`;
  body += `\n────────────────────────────\n`;
  body += `MESSAGE\n`;
  body += `────────────────────────────\n`;
  body += `${message}\n\n`;
  if (newsletter) body += `[Subscribed to newsletter: Yes]\n\n`;
  body += `────────────────────────────\n`;
  body += `Sent via alexmorgandev.com portfolio\n`;

  window.location.href = `mailto:${toEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;

  setTimeout(() => {
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
  }, 500);
});

resetFormBtn.addEventListener('click', () => {
  contactForm.reset();
  contactForm.style.display = 'block';
  formSuccess.style.display = 'none';
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a[href^="#"]');

const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(l => {
        l.style.color = l.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => activeObserver.observe(s));
