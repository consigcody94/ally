// Main JavaScript - Navigation and General Functionality

(function() {
    'use strict';

    // ===== PAGE LOADER =====
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        window.addEventListener('load', () => {
            pageLoader.classList.add('hidden');
        });
        // Fallback - hide after 2 seconds max
        setTimeout(() => {
            pageLoader.classList.add('hidden');
        }, 2000);
    }

    // ===== MOBILE NAVIGATION =====
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close menu if it's a dropdown trigger
            if (link.parentElement.classList.contains('dropdown')) {
                e.preventDefault();
                link.parentElement.classList.toggle('active');
                return;
            }

            // Close mobile menu
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // ===== STICKY HEADER =====
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#' || !href) return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with animation
    const animatedElements = document.querySelectorAll('.service-card, .event-card, .stat-item, .feature-item, .value-card');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // ===== STATS COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const hasPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));

        if (isNaN(numericValue)) return;

        const duration = 2000;
        const increment = numericValue / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;

            if (current < numericValue) {
                element.textContent = Math.floor(current) + (hasPlus ? '+' : '') + (isPercentage ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // ===== HERO SCROLL BUTTON =====
    const heroScroll = document.querySelector('.hero-scroll');

    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = servicesSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

})();
