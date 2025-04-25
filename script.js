document.addEventListener('DOMContentLoaded', function() {
    // ============ Mobile Menu Toggle ============
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const accountSection = document.querySelector('.account-section');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isNavVisible = mainNav.style.display === 'block';
        
        if (isNavVisible) {
            mainNav.style.display = 'none';
            accountSection.style.display = 'none';
        } else {
            mainNav.style.display = 'block';
            accountSection.style.display = 'flex';
            
            // Adjust styles for mobile
            mainNav.style.position = 'absolute';
            mainNav.style.top = '100%';
            mainNav.style.left = '0';
            mainNav.style.width = '100%';
            mainNav.style.backgroundColor = 'white';
            mainNav.style.padding = '20px';
            mainNav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            
            mainNav.querySelector('ul').style.flexDirection = 'column';
            mainNav.querySelectorAll('li').forEach(li => {
                li.style.margin = '10px 0';
            });
            
            accountSection.style.position = 'absolute';
            accountSection.style.top = 'calc(100% + 180px)';
            accountSection.style.left = '0';
            accountSection.style.width = '100%';
            accountSection.style.backgroundColor = 'white';
            accountSection.style.padding = '20px';
            accountSection.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            accountSection.style.flexDirection = 'column';
            
            document.querySelectorAll('.account, .register').forEach(el => {
                el.style.margin = '10px 0';
                el.style.justifyContent = 'center';
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            mainNav.style.display = 'block';
            accountSection.style.display = 'flex';
            
            // Reset styles for desktop
            mainNav.style.position = '';
            mainNav.style.top = '';
            mainNav.style.left = '';
            mainNav.style.width = '';
            mainNav.style.backgroundColor = '';
            mainNav.style.padding = '';
            mainNav.style.boxShadow = '';
            
            mainNav.querySelector('ul').style.flexDirection = '';
            mainNav.querySelectorAll('li').forEach(li => {
                li.style.margin = '';
            });
            
            accountSection.style.position = '';
            accountSection.style.top = '';
            accountSection.style.left = '';
            accountSection.style.width = '';
            accountSection.style.backgroundColor = '';
            accountSection.style.padding = '';
            accountSection.style.boxShadow = '';
            accountSection.style.flexDirection = '';
            
            document.querySelectorAll('.account, .register').forEach(el => {
                el.style.margin = '';
                el.style.justifyContent = '';
            });
        } else {
            mainNav.style.display = 'none';
            accountSection.style.display = 'none';
        }
    });

    // ============ Hero Carousel ============
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const slidesContainer = document.querySelector('.carousel-slides');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let slideInterval;
    
    // Update carousel position
    function updateCarousel() {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100 / totalSlides}%)`;
        
        // Update active indicator
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Update active slide
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Start auto-rotation
    function startAutoRotation() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Reset auto-rotation timer
    function resetAutoRotation() {
        clearInterval(slideInterval);
        startAutoRotation();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetAutoRotation();
    });
    
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetAutoRotation();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetAutoRotation();
        });
    });
    
    // Pause on hover
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', startAutoRotation);
    }
    
    // Initialize
    updateCarousel();
    startAutoRotation();

    // ============ Partners Slider ============
    const partnersSlider = document.querySelector('.partners-slider');
    if (partnersSlider) {
        const partnerLogos = partnersSlider.querySelectorAll('.partner-logo');
        let currentPartnerIndex = 0;
        
        function animatePartners() {
            currentPartnerIndex = (currentPartnerIndex + 1) % partnerLogos.length;
            const offset = -currentPartnerIndex * 190; // 150px width + 40px gap
            partnersSlider.style.transform = `translateX(${offset}px)`;
        }
        
        // Auto animate partners
        let partnerInterval = setInterval(animatePartners, 3000);
        
        // Pause on hover
        partnersSlider.addEventListener('mouseenter', () => {
            clearInterval(partnerInterval);
        });
        
        partnersSlider.addEventListener('mouseleave', () => {
            partnerInterval = setInterval(animatePartners, 3000);
        });
    }

    // ============ Smooth Scrolling ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip if href is just #
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset considering fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 1024 && mainNav.style.display === 'block') {
                    mainNav.style.display = 'none';
                    accountSection.style.display = 'none';
                }
            }
        });
    });

    // ============ Scroll Animations ============
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .product-card, .news-card');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animation
    document.querySelectorAll('.feature-card, .product-card, .news-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger once on load

    // ============ Language Selector ============
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('click', function() {
            // Create language dropdown
            const dropdown = document.createElement('div');
            dropdown.className = 'language-dropdown';
            dropdown.innerHTML = `
                <ul>
                    <li><a href="#" data-lang="vi">Tiếng Việt</a></li>
                    <li><a href="#" data-lang="en">English</a></li>
                    <li><a href="#" data-lang="fr">Français</a></li>
                </ul>
            `;
            
            // Position dropdown
            const rect = languageSelector.getBoundingClientRect();
            dropdown.style.position = 'absolute';
            dropdown.style.top = `${rect.bottom}px`;
            dropdown.style.left = `${rect.left}px`;
            dropdown.style.backgroundColor = 'white';
            dropdown.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            dropdown.style.borderRadius = '4px';
            dropdown.style.padding = '10px 0';
            dropdown.style.zIndex = '1000';
            
            // Add click handler for language items
            dropdown.querySelectorAll('a').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const lang = this.getAttribute('data-lang');
                    languageSelector.querySelector('span').textContent = this.textContent;
                    document.body.removeChild(dropdown);
                    // Here you would typically change the language
                    console.log(`Language changed to ${lang}`);
                });
            });
            
            // Add to DOM
            document.body.appendChild(dropdown);
            
            // Close dropdown when clicking outside
            function handleClickOutside(e) {
                if (!languageSelector.contains(e.target) && !dropdown.contains(e.target)) {
                    document.body.removeChild(dropdown);
                    document.removeEventListener('click', handleClickOutside);
                }
            }
            
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
            }, 0);
        });
    }

    // ============ Loading Animation ============
    window.addEventListener('load', function() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            setTimeout(function() {
                loadingOverlay.style.opacity = '0';
                loadingOverlay.style.visibility = 'hidden';
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 500);
            }, 1000);
        }
    });

    // ============ Test Drive Button ============
    const testDriveBtns = document.querySelectorAll('.register, .cta-button');
    testDriveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Here you would typically show a registration form
            alert('Chức năng đăng ký lái thử sẽ được mở ở đây');
        });
    });
});