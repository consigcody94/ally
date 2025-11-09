// Event Carousel Script

(function() {
    'use strict';

    const carousel = document.getElementById('events-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const cards = track.querySelectorAll('.event-card');

    if (!track || !prevBtn || !nextBtn || cards.length === 0) return;

    let currentIndex = 0;
    let cardsPerView = 3;
    let autoPlayInterval;

    // Determine cards per view based on screen width
    function updateCardsPerView() {
        const width = window.innerWidth;

        if (width < 768) {
            cardsPerView = 1;
        } else if (width < 1024) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }

        updateCarousel();
    }

    // Update carousel position
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem gap
        const offset = -(currentIndex * (cardWidth + gap));

        track.style.transform = `translateX(${offset}px)`;

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= cards.length - cardsPerView;

        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }

    // Next slide
    function nextSlide() {
        if (currentIndex < cards.length - cardsPerView) {
            currentIndex++;
            updateCarousel();
        } else {
            // Loop back to start
            currentIndex = 0;
            updateCarousel();
        }
    }

    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    // Auto-play functionality
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    // Touch/swipe support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;

        const diff = startX - currentX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        startAutoPlay();
    });

    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Responsive handling
    window.addEventListener('resize', updateCardsPerView);

    // Initialize
    updateCardsPerView();
    startAutoPlay();

})();
