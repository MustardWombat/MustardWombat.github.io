// Load header and footer components
async function loadComponents() {
    // Determine base URL based on current path
    const isProjectPage = window.location.pathname.includes('/projects/');
    const baseUrl = isProjectPage ? '../' : '';
    
    try {
        // Load header
        const headerResponse = await fetch(`${baseUrl}components/header.html`);
        const headerHTML = await headerResponse.text();
        const headerElement = document.querySelector('header');
        if (headerElement) {
            headerElement.innerHTML = headerHTML.replace(/{{baseUrl}}/g, baseUrl);
        }
        
        // Load footer
        const footerResponse = await fetch(`${baseUrl}components/footer.html`);
        const footerHTML = await footerResponse.text();
        const footerElement = document.querySelector('footer');
        if (footerElement) {
            footerElement.innerHTML = footerHTML;
        }
        
        // Initialize all functionality after components load
        initializeMobileMenu();
        initializeSmoothScrolling();
        initializeHeaderScroll();
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
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
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 60;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Initialize header scroll effect
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            }
        });
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    
    // Initialize animations
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
});
