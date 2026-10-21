/* Public-safe portfolio project notes. Update these when new work is ready to share. */
const projects = {
  production: {
    category: 'Development', label: 'OJT / Private internal work',
    title: 'Manufacturing Production Tracker',
    summary: 'An internal production workflow application created during industry training. It brings operational input, target planning, and visual reporting into a single browser-based interface for a local network environment.',
    highlights: ['Worked on React frontend experiences and Node.js/Express API integration.', 'Designed workflows for planned targets, daily records, summaries, and visual dashboards.', 'Used PostgreSQL for structured application data and explored role-based access and session behavior.', 'Focused on usability for different operational roles and practical LAN deployment.'],
    disclaimer: 'Internal company project: source code, real screenshots, production figures, infrastructure information, and company-specific details are deliberately not public.'
  },
  accessibility: {
    category: 'Research', label: 'Academic / Research concept',
    title: 'AI-Driven Accessibility Recommendation System',
    summary: 'An academic research concept exploring how a web interface might recommend accessibility preferences based on individual needs and interactions. It is presented as a research direction, not a deployed or validated AI product.',
    highlights: ['Investigated personalization concepts such as adaptable typography and contrast.', 'Considered preference learning and interaction signals as potential system inputs.', 'Studied usability and accessibility evaluation approaches, including WCAG and ISO/IEC 25010.', 'Framed system scope, research objectives, and evaluation criteria.'],
    disclaimer: 'Research-stage work. The interface shown in this portfolio is an original illustrative mockup, not a screenshot of a working AI system.'
  },
  clinic: {
    category: 'Development', label: 'Academic / Frontend exercise',
    title: 'Clinic Appointment Request',
    summary: 'A Vue.js appointment request exercise with patient information, form validation, conditional fields, and a reviewable summary of the submitted request.',
    highlights: ['Applied Vue 3 reactive bindings with v-model and computed properties.', 'Designed required-field validation and conditional inputs.', 'Organized appointment types, preferred times, and a confirmation view.'],
    disclaimer: 'Academic application exercise; it is not connected to a real clinic or patient-record system.'
  },
  'vue-lost': {
    category: 'Development', label: 'Academic / Frontend exercise',
    title: 'Lost & Found Item Tracker',
    summary: 'An academic Vue application for recording found items, looking up entries, marking records as claimed, and displaying status totals.',
    highlights: ['Practiced Vue lists, dynamic rendering, and reactive arrays.', 'Explored add, search, claim, and delete item flows.', 'Designed simple status visibility for claimed and unclaimed items.'],
    disclaimer: 'Coursework exercise. The decorative illustration is not a production screenshot.'
  },
  'python-lost': {
    category: 'Development', label: 'Academic / Python application',
    title: 'Python Lost-and-Found App',
    summary: 'A Python coursework project focused on organizing found-item records and implementing practical tracking behavior.',
    highlights: ['Explored structured program organization and Python logic.', 'Worked on record operations and item lookup concepts.', 'Prepared accompanying project documentation and reflection material.'],
    disclaimer: 'Academic work. The terminal graphic contains illustrative sample code rather than the project source.'
  },
  employee: {
    category: 'Development', label: 'Practice / Database web project',
    title: 'Employee Record System',
    summary: 'A PHP and MySQL project exploring the core screens and data-management patterns used in an employee records application.',
    highlights: ['Worked with PHP server-side flows and MySQL persistence.', 'Practiced employee record creation, retrieval, updating, and deletion.', 'Considered how to organize admin-facing information.'],
    disclaimer: 'Learning project; not presented as a production HR or payroll platform.'
  },
  razor: {
    category: 'Development', label: 'Academic / ASP.NET',
    title: 'ASP.NET Login & Dashboard',
    summary: 'A small ASP.NET Razor Pages project built to explore authentication-oriented page flows and dashboard organization.',
    highlights: ['Practiced Razor Pages page structure and navigation.', 'Explored basic login and dashboard screens.', 'Developed familiarity with the ASP.NET application model.'],
    disclaimer: 'Academic mini-application, not a public authentication service.'
  },
  nfc: {
    category: 'Design', label: 'Design / NFC and QR touchpoints',
    title: 'NFC & QR Review Cards',
    summary: 'Customizable visual designs for physical cards and standees that help customers reach a business review or social page through a tap or scan.',
    highlights: ['Designed 120 × 120 mm concepts pairing a QR area with a tap-to-rate interaction.', 'Created variations for Google reviews and Facebook pages.', 'Considered visual hierarchy, print readability, and clear call-to-action wording.'],
    disclaimer: 'Graphic shown here is an illustrative layout, not a working scannable QR code. Individual customer links are intentionally omitted.'
  },
  'qr-menu': {
    category: 'Design', label: 'Design / Tabletop QR experience',
    title: 'QR Menu Table Stickers',
    summary: 'A table-sticker concept designed to help café customers reach a digital menu from a simple scan at their table.',
    highlights: ['Worked with branding, menu access prompts, and high-contrast sticker layouts.', 'Focused on scan affordance and clear placement of the QR area.', 'Explored practical customer-facing print dimensions.'],
    disclaimer: 'The QR pattern shown is decorative and does not encode a menu URL.'
  },
  documents: {
    category: 'Design', label: 'Design / Business documents',
    title: 'Business Documents & Templates',
    summary: 'Reusable business-document templates, including quotations, job reports, and generic receipt layouts.',
    highlights: ['Created structured content areas for work scope, quantities, and approvals.', 'Refined branded headers, typographic hierarchy, and page layout.', 'Prepared editable and print-friendly formats.'],
    disclaimer: 'The illustrated sample contains no real client or business contact information.'
  }
};

const menuButton = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('#primary-nav');
function closeMenu() {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav?.classList.contains('is-open')) closeMenu();
});

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projectCards = [...document.querySelectorAll('[data-project]')];
const status = document.getElementById('filter-announcement');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(other => {
      const active = other === button;
      other.classList.toggle('active', active);
      other.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    projectCards.forEach(card => {
      card.hidden = selected !== 'all' && card.dataset.category !== selected;
      if (!card.hidden) visible++;
    });
    status.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} shown: ${selected === 'all' ? 'all work' : selected}.`;
  });
});

const dialog = document.getElementById('project-dialog');
const closeButton = document.getElementById('dialog-close');
let returnFocus = null;
function closeDialog() {
  if (!dialog.open) return;
  dialog.close();
}
function setText(id, value) { document.getElementById(id).textContent = value; }
function openProject(id, opener) {
  const project = projects[id];
  if (!project || !dialog || typeof dialog.showModal !== 'function') return;
  returnFocus = opener;
  setText('dialog-type', project.category.toUpperCase());
  setText('dialog-label', project.label.toUpperCase());
  setText('dialog-title', project.title);
  setText('dialog-summary', project.summary);
  setText('dialog-disclaimer', project.disclaimer);
  const highlights = document.getElementById('dialog-highlights');
  highlights.replaceChildren(...project.highlights.map(highlight => {
    const li = document.createElement('li');
    li.textContent = highlight;
    return li;
  }));
  dialog.showModal();
  closeButton.focus();
}
document.querySelectorAll('[data-open-project]').forEach(button => {
  button.addEventListener('click', () => openProject(button.dataset.openProject, button));
});
closeButton?.addEventListener('click', closeDialog);
document.getElementById('dialog-done')?.addEventListener('click', closeDialog);
dialog?.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
dialog?.addEventListener('close', () => { if (returnFocus?.isConnected) returnFocus.focus(); returnFocus = null; });
const year = document.getElementById('copyright-year');
if (year) year.textContent = String(new Date().getFullYear());
