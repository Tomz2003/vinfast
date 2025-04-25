document.addEventListener('DOMContentLoaded', function() {
    // Có thể thêm các hiệu ứng hoặc tính năng tương tác ở đây
    console.log("VinFast VF Wild Page Loaded");
    
    // Ví dụ: Thêm hiệu ứng khi scroll
    window.addEventListener('scroll', function() {
        const vehicleImage = document.querySelector('.vehicle-image img');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            vehicleImage.style.transform = 'scale(1.01)';
        } else {
            vehicleImage.style.transform = 'scale(1)';
        }
    });

    // Thêm hiệu ứng khi hover vào các spec-item
    const specItems = document.querySelectorAll('.spec-item');
    specItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});