document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const closeLightbox = document.querySelector('.close-lightbox');
    const triggers = document.querySelectorAll('.lightbox-trigger');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentImageIndex = 0;
    const images = Array.from(triggers).map(trigger => trigger.src);
    
    function showImage(index) {
        if (index < 0) {
            currentImageIndex = images.length - 1;
        } else if (index >= images.length) {
            currentImageIndex = 0;
        } else {
            currentImageIndex = index;
        }
        lightboxImg.src = images[currentImageIndex];
    }

    triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', function() {
            currentImageIndex = index;
            showImage(currentImageIndex);
            lightbox.classList.add('active');
            document.documentElement.style.overflow = 'hidden'; 
            document.body.style.overflow = 'hidden';
            hamburger.style.display = 'none'; 
        });
    });

    closeLightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.documentElement.style.overflow = ''; 
        document.body.style.overflow = '';
        hamburger.style.display = '';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.documentElement.style.overflow = ''; 
            document.body.style.overflow = '';
            hamburger.style.display = ''; 
        }
    });
    
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showImage(currentImageIndex - 1);
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showImage(currentImageIndex + 1);
    });
    
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.documentElement.style.overflow = ''; 
                document.body.style.overflow = '';
                hamburger.style.display = ''; 
            } else if (e.key === 'ArrowLeft') {
                showImage(currentImageIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showImage(currentImageIndex + 1);
            }
        }
    });
    
    const eventBlocks = document.querySelectorAll('.event-block');
    let animationStarted = false;
    let animationTimeout = null;
    let initialLoad = true;
    
    function showBlocksSequentially() {
        if (animationStarted) return;
        animationStarted = true;
        
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
            hamburger.style.display = 'block';
        }
        
        eventBlocks.forEach(block => {
            block.style.opacity = '0';
            block.style.transform = 'translateY(20px)';
            block.style.transition = 'none';
        });
        
        eventBlocks[0].offsetHeight;

        eventBlocks.forEach(block => {
            block.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        eventBlocks.forEach((block, index) => {
            setTimeout(() => {
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }, index * 800);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !initialLoad) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    eventBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(block);
    });
    
    if (document.readyState === 'complete') {
        showBlocksSequentially();
        initialLoad = false;
    } else {
        window.addEventListener('load', () => {
            if (animationTimeout) {
                clearTimeout(animationTimeout);
            }
            animationTimeout = setTimeout(() => {
                showBlocksSequentially();
                initialLoad = false;
            }, 100);
        });
    }
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                hamburger.style.display = 'block';
            } else {
                hamburger.style.display = '';
            }
        }, 250);
    });
    
    let scrollTimeout;
    function handleScroll() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {

        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
}); 