// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Progress Bars Animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.progress-fill').forEach(bar => {
                bar.classList.add('animate');
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('#habilidades');
if (skillsSection) {
    progressObserver.observe(skillsSection);
}

// Form Validation
const contactForm = document.getElementById('contactForm');
const successMessage = document.querySelector('.success-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        group.classList.remove('error');
        if (!input.value.trim()) {
            group.classList.add('error');
            isValid = false;
        }
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                group.classList.add('error');
                isValid = false;
            }
        }
    });
    if (isValid) {
        // Construir mailto
        const name = contactForm.querySelector('#name').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const subject = contactForm.querySelector('#subject').value.trim();
        const message = contactForm.querySelector('#message').value.trim();
        const mailto = `mailto:hola@pablomaciasmu.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `${message}`
        )}`;
        window.location.href = mailto;
    }
});

// Modal
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = '';
        }
    });
});

// Console message
console.log('%c👋 Hola! Gracias por revisar el código 😊', 'font-size: 16px; color: #0ea5e9; font-weight: bold;');
console.log('%cSi estás interesado en trabajar juntos, no dudes en contactarme!', 'font-size: 14px; color: #64748b;');
