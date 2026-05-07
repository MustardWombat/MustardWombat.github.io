// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
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
        // If target is not found, let default behavior happen (e.g., browser jumps to anchor)
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

// Project showcase: wipe-in animation on scroll
const showcaseItems = document.querySelectorAll('.ps-item');

// Randomize sticker field positions/delays before observer fires
function initStickerField() {
    const field = document.querySelector('.sticker-field');
    if (!field) return;
    const allStickers = Array.from(field.querySelectorAll('.sticker'));
    if (!allStickers.length) return;

    // Separate hero from pool
    const heroEl = field.querySelector('.sticker-hero');
    const stickers = allStickers.filter(s => !s.classList.contains('sticker-hero'));

    const types = ['s-msu','s-spartan','s-gruff','s-mac','s-statecenter','s-spartymod','s-swirl','s-letter','s-michstate'];

    // Round-robin interleave by type so same logos never get placed back-to-back
    const typeQueues = {};
    types.forEach(t => { typeQueues[t] = []; });
    stickers.forEach(s => {
        const t = types.find(t => s.classList.contains(t)) || 's-msu';
        typeQueues[t].push(s);
    });
    const interleaved = [];
    let anyLeft = true;
    while (anyLeft) {
        anyLeft = false;
        types.forEach(t => {
            if (typeQueues[t].length) { interleaved.push(typeQueues[t].shift()); anyLeft = true; }
        });
    }

    // Repulsion placement — reject center dead zone and positions too close to existing stickers
    const MIN_DIST = 20; // % min distance between centers
    const CX1 = 30, CX2 = 70, CY1 = 25, CY2 = 75; // center dead zone
    const placed = [];

    interleaved.forEach(sticker => {
        let best = null, bestScore = -1;
        for (let attempt = 0; attempt < 120; attempt++) {
            const cx = 7 + Math.random() * 86;
            const cy = 7 + Math.random() * 86;
            if (cx > CX1 && cx < CX2 && cy > CY1 && cy < CY2) continue;
            let minD = 999;
            for (const p of placed) {
                const d = Math.sqrt((cx - p.cx) ** 2 + (cy - p.cy) ** 2);
                if (d < minD) minD = d;
            }
            if (placed.length === 0 || minD >= MIN_DIST) { best = { cx, cy }; break; }
            if (minD > bestScore) { bestScore = minD; best = { cx, cy }; }
        }
        placed.push(best);
        const rot = (Math.random() - 0.5) * 44;
        sticker.style.left = best.cx.toFixed(1) + '%';
        sticker.style.top  = best.cy.toFixed(1) + '%';
        sticker.style.setProperty('--r', rot.toFixed(1) + 'deg');
        sticker.dataset.rot = rot.toFixed(1);
    });

    // Stagger delays and z-index for pool stickers
    const assigned = interleaved;
    const order = assigned.map((_, i) => i).sort(() => Math.random() - 0.5);
    order.forEach((origIdx, newOrder) => {
        assigned[origIdx].style.animationDelay = (newOrder * 0.065).toFixed(3) + 's';
        assigned[origIdx].style.zIndex = newOrder + 1;
    });

    // Hero: always centered, no rotation, always last
    const heroDelay = (assigned.length - 1) * 0.065 + 0.35;
    if (heroEl) {
        heroEl.style.left = '50%';
        heroEl.style.top  = '50%';
        heroEl.style.setProperty('--r', '0deg');
        heroEl.style.animationDelay = heroDelay.toFixed(2) + 's';
        heroEl.style.zIndex = 9999;
    }

    // Return timing so observer can fire shockwave at the right moment
    return { assigned, field, heroDelay, heroDuration: 0.6 };
}

function fireShockwave({ assigned, field, heroDelay, heroDuration }) {
    setTimeout(() => {
        const ring1 = document.createElement('div');
        ring1.className = 'sticker-ripple-ring';
        field.appendChild(ring1);
        const ring2 = document.createElement('div');
        ring2.className = 'sticker-ripple-ring ring-2';
        field.appendChild(ring2);
        setTimeout(() => { ring1.remove(); ring2.remove(); }, 900);

        const fieldRect = field.getBoundingClientRect();
        const cx = fieldRect.width / 2;
        const cy = fieldRect.height / 2;

        assigned.forEach(s => {
            const rect = s.getBoundingClientRect();
            const sx = (rect.left - fieldRect.left) + rect.width / 2;
            const sy = (rect.top - fieldRect.top) + rect.height / 2;
            const dx = sx - cx;
            const dy = sy - cy;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 80 / (1 + dist * 0.012);
            const pushX = (dx / dist) * force;
            const pushY = (dy / dist) * force;

            s.style.transition = 'translate 0.22s cubic-bezier(0.4, 0, 1, 1)';
            s.style.translate = `${pushX.toFixed(1)}px ${pushY.toFixed(1)}px`;
            setTimeout(() => {
                s.style.transition = 'translate 1s cubic-bezier(0.22, 1, 0.36, 1)';
                s.style.translate = '0px 0px';
            }, 240);
        });
    }, (heroDelay + heroDuration) * 1000);
}

const stickerState = initStickerField();

if (showcaseItems.length > 0) {
    const showcaseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Fire shockwave if this is the education sticker panel
                if (stickerState && entry.target.querySelector('.sticker-field')) {
                    fireShockwave(stickerState);
                }
                showcaseObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    showcaseItems.forEach(item => showcaseObserver.observe(item));
}
