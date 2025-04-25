document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo hiệu ứng
    initAnimations();
    
    // Thêm smooth scrolling
    setupSmoothScrolling();
    
    // Thêm lazy loading cho hình ảnh
    setupLazyLoading();
    
    // Thêm hiệu ứng khi scroll
    setupScrollAnimations();
});

function initAnimations() {
    // Ẩn các phần tử cần animate
    const features = document.querySelectorAll('.feature');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(30px)';
        feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

function setupSmoothScrolling() {
    // Smooth scrolling cho các liên kết nội bộ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Thêm focus cho accessibility
                setTimeout(() => {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }, 500);
            }
        });
    });
}

function setupLazyLoading() {
    // Lazy loading cho hình ảnh
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function setupScrollAnimations() {
    // Hiệu ứng khi scroll
    const animateOnScroll = () => {
        const features = document.querySelectorAll('.feature');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        features.forEach((feature, index) => {
            if (isInViewport(feature, 100)) {
                setTimeout(() => {
                    feature.style.opacity = '1';
                    feature.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
        
        galleryItems.forEach((item, index) => {
            if (isInViewport(item, 100)) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, index * 100);
            }
        });
    };
    
    // Chạy lần đầu khi load trang
    animateOnScroll();
    
    // Chạy mỗi khi scroll
    window.addEventListener('scroll', throttle(animateOnScroll, 100));
}

// Hàm helper kiểm tra element có trong viewport không
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight - offset) &&
        rect.bottom >= offset
    );
}

// Hàm giới hạn tần suất gọi hàm khi scroll
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}