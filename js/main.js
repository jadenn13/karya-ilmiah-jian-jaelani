// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        offset: 100
    });

    // Simulate loading screen
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        const mainContent = document.getElementById('main-content');
        
        // Hide loading screen
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Show main content
        mainContent.classList.add('visible');
    }, 2000);

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            applyCardHoverEffect(this);
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
            removeCardHoverEffect(this);
        });
    });

    // Add parallax effect to sections
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('.main-section, .advanced-section, .benefits');
        
        sections.forEach(section => {
            const speed = 0.05;
            const yPos = -(scrollPosition * speed);
            section.style.backgroundPosition = `center ${yPos}px`;
        });
    });

    // Add typing animation to quote
    const quoteElement = document.querySelector('.quote span');
    const quoteText = quoteElement.textContent;
    quoteElement.textContent = '';
    
    let charIndex = 0;
    function typeWriter() {
        if (isElementInViewport(quoteElement.parentElement) && charIndex < quoteText.length) {
            quoteElement.textContent += quoteText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing when quote is in viewport
    window.addEventListener('scroll', function() {
        if (isElementInViewport(quoteElement.parentElement) && charIndex === 0) {
            typeWriter();
        }
    });

    // Check if element is in viewport on initial load
    if (isElementInViewport(quoteElement.parentElement)) {
        typeWriter();
    }

    // Add number counter animation to benefits list
    const benefitItems = document.querySelectorAll('.benefit-item');
    let hasAnimated = false;

    window.addEventListener('scroll', function() {
        if (isElementInViewport(document.querySelector('.benefits')) && !hasAnimated) {
            hasAnimated = true;
            benefitItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 100);
                }, index * 200);
            });
        }
    });

    // Add floating animation to section titles
    const titles = document.querySelectorAll('.section-title, .advanced-title');
    titles.forEach(title => {
        title.style.animation = 'float 3s ease-in-out infinite';
    });
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Card hover effects
function applyCardHoverEffect(card) {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
    
    // Animate icon
    const icon = card.querySelector('.card-icon');
    if (icon) {
        icon.style.transform = 'rotateY(180deg)';
        icon.style.background = 'rgba(52, 152, 219, 0.2)';
    }
    
    // Animate title underline
    const title = card.querySelector('h3');
    if (title) {
        const underline = title.querySelector('::after');
        if (underline) {
            underline.style.width = '100px';
        }
    }
}

function removeCardHoverEffect(card) {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
    
    // Reset icon
    const icon = card.querySelector('.card-icon');
    if (icon) {
        icon.style.transform = 'rotateY(0)';
        icon.style.background = 'rgba(52, 152, 219, 0.1)';
    }
    
    // Reset title underline
    const title = card.querySelector('h3');
    if (title) {
        const underline = title.querySelector('::after');
        if (underline) {
            underline.style.width =
