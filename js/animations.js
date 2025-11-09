/**
 * Alliance Operations - Advanced Animations
 * Luxury scroll reveals and text materialization
 */

// Intersection Observer for scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize animations on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Observe all fade-in elements (excluding hero section elements)
    const fadeElements = document.querySelectorAll('section:not(.hero) .fade-in, section:not(.hero) .fade-in-left, section:not(.hero) .fade-in-right');
    fadeElements.forEach(el => animateOnScroll.observe(el));

    // Observe stagger containers
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(el => animateOnScroll.observe(el));

    // Observe elite underlines
    const eliteUnderlines = document.querySelectorAll('.elite-underline');
    eliteUnderlines.forEach(el => animateOnScroll.observe(el));

    // Add luxury card class to service cards
    const serviceCards = document.querySelectorAll('.service-card, .event-card, .value-card');
    serviceCards.forEach(card => {
        card.classList.add('luxury-card');
    });

    // Parallax effect on scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const parallaxElements = document.querySelectorAll('.parallax-slow');

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(currentScrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });

        lastScrollY = currentScrollY;
    }, { passive: true });

    // Smooth number counting for stats
    const stats = document.querySelectorAll('.stat-number');
    const countUp = (element) => {
        const target = element.textContent;
        const isPlus = target.includes('+');
        const isPercent = target.includes('%');
        const numValue = parseInt(target.replace(/[^0-9]/g, ''));

        if (isNaN(numValue)) return;

        let current = 0;
        const increment = numValue / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numValue) {
                current = numValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (isPlus ? '+' : '') + (isPercent ? '%' : '');
        }, 30);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                countUp(entry.target);
                entry.target.dataset.counted = 'true';
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // Add premium button effects
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        if (!btn.classList.contains('btn-premium')) {
            btn.classList.add('btn-premium');
        }
    });

    // Text materialization for hero titles
    const heroTitles = document.querySelectorAll('.hero-title, .page-title');
    heroTitles.forEach((title, index) => {
        title.classList.add('materialize-text');
        if (index > 0) {
            title.classList.add(`materialize-delay-${Math.min(index, 3)}`);
        }
    });

    // Add shimmer effect to highlighted text on hover
    const highlights = document.querySelectorAll('.highlight-accent');
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'scale(1.05)';
        });
        highlight.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add page transition class to body
    document.body.classList.add('page-transition');

    // Lazy load images with fade-in
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('fade-in');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Elite entrance animation for sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index > 0) { // Skip hero section
            section.classList.add('fade-in');
        }
    });

    // Add subtle hover effect to all links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
});

// Optional: Advanced cursor effect (luxury pointer)
let cursorDot, cursorOutline;
const createLuxuryCursor = () => {
    cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: #4682B4;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.15s ease;
    `;

    cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    cursorOutline.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(70, 130, 180, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.15s ease;
    `;

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX - 4 + 'px';
        cursorDot.style.top = e.clientY - 4 + 'px';
        cursorOutline.style.left = e.clientX - 20 + 'px';
        cursorOutline.style.top = e.clientY - 20 + 'px';
    });

    // Expand cursor on hover over interactive elements
    const interactives = document.querySelectorAll('a, button, .btn, input, textarea');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(1.5)';
            cursorOutline.style.transform = 'scale(1.5)';
            cursorOutline.style.borderColor = 'rgba(70, 130, 180, 0.8)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
            cursorOutline.style.borderColor = 'rgba(70, 130, 180, 0.5)';
        });
    });
};

// Uncomment to enable luxury cursor (desktop only)
if (window.innerWidth > 1024) {
    // createLuxuryCursor();
}
