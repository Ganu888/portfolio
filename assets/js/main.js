/* ===== MOBILE MENU ===== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

/* ===== SMOOTH SCROLLING ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ===== ACTIVE SECTION HIGHLIGHTING ===== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

/* ===== SCROLL REVEAL ANIMATIONS ===== */
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

// Observe all sections and cards
document.querySelectorAll('.section, .skills__category, .services__card, .portfolio__item, .contact__card, .qualification__item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

/* ===== SKILLS ACCORDION ===== */
const skillsHeaders = document.querySelectorAll('.skills__header');

skillsHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const skillsList = header.nextElementSibling;
        const isActive = header.classList.contains('active');

        // Close all other accordions
        skillsHeaders.forEach(otherHeader => {
            if (otherHeader !== header) {
                otherHeader.classList.remove('active');
                otherHeader.nextElementSibling.classList.remove('show');
            }
        });

        // Toggle current accordion
        if (isActive) {
            header.classList.remove('active');
            skillsList.classList.remove('show');
        } else {
            header.classList.add('active');
            skillsList.classList.add('show');
        }
    });
});

// Open first accordion by default
if (skillsHeaders.length > 0) {
    skillsHeaders[0].classList.add('active');
    skillsHeaders[0].nextElementSibling.classList.add('show');
}

/* ===== ANIMATE PROGRESS BARS ===== */
const progressBars = document.querySelectorAll('.skills__percentage');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const percentage = entry.target.getAttribute('data-percentage');
            entry.target.style.width = percentage + '%';
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

/* ===== STATS COUNTER ===== */
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    entry.target.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    entry.target.textContent = target;
                    entry.target.classList.add('counted');
                }
            };

            updateCounter();
        }
    });
}, { threshold: 0.5 });

const counters = document.querySelectorAll('.about__stat-number');
counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const speed = 100; // smaller = faster
  
    const updateCount = () => {
      const increment = target / speed;
  
      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + "+";   // 👈 Final output: 10+
      }
    };
  
    updateCount();
  });

/* ===== SERVICE MODAL ===== */
const serviceModal = document.getElementById('service-modal');
const modalClose = document.getElementById('modal-close');
const serviceButtons = document.querySelectorAll('.services__button');

const serviceDetails = {
    frontend: [
        'Responsive web design',
        'HTML5, CSS3, JavaScript',
        'React, Vue.js, Angular',
        'UI/UX implementation',
        'Cross-browser compatibility',
        'Performance optimization'
    ],
    backend: [
        'RESTful API development',
        'Database design and management',
        'Server-side scripting',
        'Authentication and authorization',
        'Cloud deployment',
        'API integration'
    ]
};

serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const serviceType = button.getAttribute('data-service');
        const modalTitle = document.getElementById('modal-title');
        const modalList = document.getElementById('modal-list');

        modalTitle.textContent = button.closest('.services__card').querySelector('.services__title').textContent;
        modalList.innerHTML = '';

        if (serviceDetails[serviceType]) {
            serviceDetails[serviceType].forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                modalList.appendChild(li);
            });
        }

        serviceModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

if (modalClose) {
    modalClose.addEventListener('click', () => {
        serviceModal.classList.remove('show');
        document.body.style.overflow = '';
    });
}

// Close modal when clicking outside
serviceModal.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
        serviceModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.classList.contains('show')) {
        serviceModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

/* ===== SCROLL TO TOP BUTTON ===== */
const scrollTop = document.getElementById('scroll-top');

function showScrollTop() {
    if (window.scrollY >= 560) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', showScrollTop);

scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ===== FORM VALIDATION ===== */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form inputs
        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const projectInput = contactForm.querySelector('textarea[name="project"]');

        // Reset previous errors
        [nameInput, emailInput, projectInput].forEach(input => {
            input.style.borderColor = '#e0e0e0';
        });

        let isValid = true;

        // Validate name
        if (nameInput.value.trim() === '') {
            nameInput.style.borderColor = '#e74c3c';
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.style.borderColor = '#e74c3c';
            isValid = false;
        }

        // Validate project description
        if (projectInput.value.trim() === '') {
            projectInput.style.borderColor = '#e74c3c';
            isValid = false;
        }

        if (isValid) {
            // Get form values
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const project = projectInput.value.trim();
            
            // Your email address
            const yourEmail = 'ganeshshinde94016@gmail.com';
            
            // Create subject with the sender's name
            const subject = encodeURIComponent(`Contact from ${name}`);
            
            // Create email body with project description and sender's email
            const body = encodeURIComponent(
                `Hello,\n\n` +
                `I would like to discuss the following project:\n\n` +
                `${project}\n\n` +
                `Contact Information:\n` +
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Best regards,\n${name}`
            );
            
            // Create mailto link
            const mailtoLink = `mailto:${yourEmail}?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            setTimeout(() => {
                alert('Thank you! Your email client should open shortly. Please send the email to complete your message.');
                contactForm.reset();
            }, 500);
        } else {
            alert('Please fill in all fields correctly.');
        }
    });
}

/* ===== HEADER SHADOW ON SCROLL ===== */
const header = document.getElementById('header');

function scrollHeader() {
    const isDarkMode = body.classList.contains('dark-theme');
    if (window.scrollY >= 100) {
        header.style.boxShadow = isDarkMode 
            ? '0 2px 8px rgba(0, 0, 0, 0.5)' 
            : '0 2px 8px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = isDarkMode 
            ? '0 2px 4px rgba(0, 0, 0, 0.3)' 
            : '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', scrollHeader);

/* ===== DARK/LIGHT MODE TOGGLE ===== */
const themeButton = document.getElementById('theme-button');
const body = document.body;

// Check for saved theme preference or default to light mode
const getTheme = () => {
    return localStorage.getItem('theme') || 'light';
};

// Apply theme
const applyTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        themeButton.classList.remove('fa-moon');
        themeButton.classList.add('fa-sun');
    } else {
        body.classList.remove('dark-theme');
        themeButton.classList.remove('fa-sun');
        themeButton.classList.add('fa-moon');
    }
};

// Initialize theme on page load
const currentTheme = getTheme();
applyTheme(currentTheme);

// Toggle theme on button click
if (themeButton) {
    themeButton.addEventListener('click', () => {
        const currentTheme = getTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Save theme preference
        localStorage.setItem('theme', newTheme);
        
        // Apply new theme
        applyTheme(newTheme);
        
        // Update header shadow for new theme
        scrollHeader();
    });
}

/* ===== INITIALIZE ON LOAD ===== */
window.addEventListener('load', () => {
    // Set initial active link
    scrollActive();
    
    // Initialize scroll top button
    showScrollTop();
    
    // Initialize header shadow
    scrollHeader();
});

