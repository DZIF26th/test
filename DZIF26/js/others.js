function openNav() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

function handleScrollAnimation() {
    const elements = document.querySelectorAll('.financial-wrapper, .shop-wrapper, .product-card');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

function initializeBuyButtons() {
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.textContent = '已售完';
            this.style.background = 'linear-gradient(145deg, #666666, #444444)';
        });
        button.addEventListener('mouseleave', function() {
            this.textContent = '立即購買';
            this.style.background = 'linear-gradient(145deg, var(--accent-blue), #2980b9)';
        });
        button.addEventListener('click', function() {
            window.open('https://youtu.be/dQw4w9WgXcQ?si=UPV3_6CBcg7N-rU4', '_blank');
        });
    });
}

window.addEventListener('scroll', handleScrollAnimation);

document.addEventListener('DOMContentLoaded', function() {
    closeNav();
    
    handleScrollAnimation();
    
    initializeBuyButtons();
}); 