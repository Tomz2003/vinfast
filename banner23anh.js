document.addEventListener('DOMContentLoaded', function() {
    // Danh sách 23 ảnh (bạn cần thay thế bằng đường dẫn thực tế)
    const images = [
        'images/sm1.jpg',
        'images/sm2.jpg',
        'images/tl33.jpg',
        'images/tl4.jpg',
        'images/tl5.jpg',
        'images/tl6.jpg',
        'images/tl7.jpg',
        'images/tl8.jpg',
        'images/tl9.jpg',
        'images/tl10.jpg',
        'images/tl11.jpg',
        'images/tl12.jpg',
        'images/tl13.jpg',
        'images/tl14.jpg',
        'images/tl3.jpg',
        'images/tl16.jpg',
        'images/tl17.jpg',
        'images/tl18.jpg',
        'images/tl19.jpg',
        'images/tl20.jpg',
        'images/tl21.jpg',
        'images/tl22.jpg',
        'images/tl23.jpg'
    ];

    const slider = document.querySelector('.banner-slider');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // Tạo các slide
    images.forEach((image, index) => {
        // Thêm slide
        const slide = document.createElement('div');
        slide.className = 'banner-slide';
        slide.innerHTML = `<img src="${image}" alt="Banner ${index + 1}">`;
        slider.appendChild(slide);

        // Thêm dot điều hướng
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Chuyển đến slide cụ thể
    function goToSlide(slideIndex) {
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
        currentSlide = slideIndex;
        
        // Cập nhật dot active
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Slide tiếp theo
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    // Slide trước đó
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }

    // Sự kiện click nút
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Tự động chuyển slide (tùy chọn)
    let slideInterval = setInterval(nextSlide, 5000);

    // Dừng tự động chuyển khi hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Tiếp tục tự động chuyển khi rời hover
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
});