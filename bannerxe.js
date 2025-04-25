// Vehicle Carousel Functionality
const vehicleSlides = document.querySelectorAll('.vehicle-slide');
const vIndicators = document.querySelectorAll('.v-indicator');
const vPrevBtn = document.querySelector('.vehicle-prev');
const vNextBtn = document.querySelector('.vehicle-next');
const vehicleSlidesContainer = document.querySelector('.vehicle-slides');

let currentVIndex = 0;
const totalVSlides = vehicleSlides.length;
let vSlideInterval;

function updateVehicleCarousel() {
    vehicleSlidesContainer.style.transform = `translateX(-${currentVIndex * 100}%)`;
    
    // Update active indicator
    vIndicators.forEach((indicator, index) => {
        if (index === currentVIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    
    // Update active slide
    vehicleSlides.forEach((slide, index) => {
        if (index === currentVIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

// Next vehicle slide
function nextVSlide() {
    currentVIndex = (currentVIndex + 1) % totalVSlides;
    updateVehicleCarousel();
    resetVehicleAutoRotation();
}

// Previous vehicle slide
function prevVSlide() {
    currentVIndex = (currentVIndex - 1 + totalVSlides) % totalVSlides;
    updateVehicleCarousel();
    resetVehicleAutoRotation();
}

// Go to specific vehicle slide
function goToVSlide(index) {
    currentVIndex = index;
    updateVehicleCarousel();
    resetVehicleAutoRotation();
}

// Start auto-rotation for vehicle carousel
function startVehicleAutoRotation() {
    vSlideInterval = setInterval(nextVSlide, 6000);
}

// Reset auto-rotation timer
function resetVehicleAutoRotation() {
    clearInterval(vSlideInterval);
    startVehicleAutoRotation();
}

// Initialize vehicle carousel
function initVehicleCarousel() {
    // Only initialize if elements exist
    if (vehicleSlides.length > 0 && vIndicators.length > 0) {
        // Set initial active slide
        updateVehicleCarousel();
        
        // Start auto-rotation
        startVehicleAutoRotation();
        
        // Event listeners for navigation buttons
        if (vNextBtn && vPrevBtn) {
            vNextBtn.addEventListener('click', nextVSlide);
            vPrevBtn.addEventListener('click', prevVSlide);
        }
        
        // Event listeners for indicators
        vIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToVSlide(index));
        });
        
        // Pause on hover
        const vehicleCarousel = document.querySelector('.vehicle-carousel');
        if (vehicleCarousel) {
            vehicleCarousel.addEventListener('mouseenter', () => {
                clearInterval(vSlideInterval);
            });
            
            vehicleCarousel.addEventListener('mouseleave', startVehicleAutoRotation);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initVehicleCarousel();
    
    // Deposit button functionality
    const depositButtons = document.querySelectorAll('.deposit-button');
    depositButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Here you would typically show a deposit form
            // For now we'll simulate with an alert
            alert('Bạn đang chọn đặt cọc cho dòng xe: ' + 
                 this.closest('.vehicle-slide').querySelector('img').alt);
            
            // In a real implementation, you would:
            // 1. Open a modal with deposit form
            // 2. Or redirect to a deposit page with vehicle ID
        });
    });
    
    // Detail link functionality
    const detailLinks = document.querySelectorAll('.detail-link');
    detailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Here you would typically navigate to vehicle detail page
            // For now we'll simulate with an alert
            alert('Chuyển đến trang chi tiết cho dòng xe: ' + 
                 this.closest('.vehicle-slide').querySelector('img').alt);
            
            // In a real implementation, you would:
            // window.location.href = '/xe/' + vehicleId;
        });
    });
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Reset carousel position on resize
    updateVehicleCarousel();
});
