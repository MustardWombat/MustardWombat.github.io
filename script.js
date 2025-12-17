// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 60;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// Add animation on scroll for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
}, observerOptions);

// Observe all project cards and skill categories
document.querySelectorAll('.project-card, .skill-category, .experience-bubble').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Background slideshow for hero section
const bgMedia = document.querySelectorAll('.bg-video, .bg-image');
let currentBg = 0;

function rotateBackground() {
    bgMedia[currentBg].classList.remove('active');
    currentBg = (currentBg + 1) % bgMedia.length;
    bgMedia[currentBg].classList.add('active');
}

// Rotate background every 8 seconds
if (bgMedia.length > 0) {
    setInterval(rotateBackground, 8000);
}

// Populate skills section dynamically from projects data
function populateSkills() {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;

    const allSkills = getAllSkills();

    // Mechanical skills
    const mechanicalDiv = document.createElement('div');
    mechanicalDiv.className = 'skill-category';
    mechanicalDiv.innerHTML = `
        <h3>🔧 Mechanical</h3>
        <ul>
            ${allSkills.mechanical.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
    `;
    skillsContainer.appendChild(mechanicalDiv);

    // Hardware skills
    const hardwareDiv = document.createElement('div');
    hardwareDiv.className = 'skill-category';
    hardwareDiv.innerHTML = `
        <h3>⚡ Hardware</h3>
        <ul>
            ${allSkills.hardware.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
    `;
    skillsContainer.appendChild(hardwareDiv);

    // Software skills with icons
    const softwareDiv = document.createElement('div');
    softwareDiv.className = 'skill-category';
    softwareDiv.innerHTML = `
        <h3>💻 Software</h3>
        <ul>
            ${allSkills.software.map(skill => `<li>${skill.name}</li>`).join('')}
        </ul>
        <div class="tech-stack-logos">
            ${allSkills.software
                .filter(skill => skill.icon)
                .map(skill => `<img src="${skill.icon}" alt="${skill.name}" title="${skill.name}" class="tech-logo">`)
                .join('')}
        </div>
    `;
    skillsContainer.appendChild(softwareDiv);
}

// Call populateSkills when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', populateSkills);
} else {
    populateSkills();
}
