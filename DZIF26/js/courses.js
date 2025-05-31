function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 && 
        rect.bottom >= 0
    );
}

function handleScrollAnimations() {
    const scrollAnimElements = document.querySelectorAll('.scroll-animation');
    
    scrollAnimElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}
// 照片燈箱
let photoGallery = [
    {
        src: "../images/IMG_2785.jpg",
        caption: "第一堂社課"
    },
    {
        src: "../images/IMG_2860.jpg",
        caption: "上課 - 網頁"
    },
    {
        src: "../images/IMG_2897.jpg",
        caption: "上課 - 網頁"
    },
    {
        src: "../images/IMG_2898.jpg",
        caption: "上課 - 網頁"
    },
    {
        src: "../images/IMG_2950.jpg",
        caption: "上課 - 網頁"
    },
    {
        src: "../images/IMG_3004.jpg",
        caption: "上課 - 網頁"
    },
    {
        src: "../images/IMG_3030.jpg",
        caption: "段考前自習"
    },
    {
        src: "../images/IMG_3031.jpg",
        caption: "段考前自習"
    },
    {
        src: "../images/IMG_3313.jpg",
        caption: "上機考複習"
    },
    {
        src: "../images/IMG_3629.jpg",
        caption: "上機考複習"
    }
];

let currentPhotoIndex = 0;
let showingAllPhotos = false;

function openLightbox(index) {
    currentPhotoIndex = index;
    document.getElementById("lightbox").style.display = "block";
    document.body.style.overflow = 'hidden';
    showCurrentPhoto();
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
    document.body.style.overflow = '';
}

function changeImage(step) {
    currentPhotoIndex += step;

    if (currentPhotoIndex >= photoGallery.length) {
        currentPhotoIndex = 0;
    } else if (currentPhotoIndex < 0) {
        currentPhotoIndex = photoGallery.length - 1;
    }
    
    showCurrentPhoto();
}

function showCurrentPhoto() {
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    
    lightboxImg.src = photoGallery[currentPhotoIndex].src;
    lightboxCaption.textContent = photoGallery[currentPhotoIndex].caption;
}


function toggleMorePhotos() {
    const hiddenPhotos = document.querySelectorAll('.hidden-photo');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    
    if (!showingAllPhotos) {
        hiddenPhotos.forEach((photo, index) => {
            setTimeout(() => {
                photo.classList.add('show');
            }, 100 * index); 
        });
        viewMoreBtn.textContent = "收起";
        viewMoreBtn.classList.add('less');
        showingAllPhotos = true;
    } else {
        hiddenPhotos.forEach((photo) => {
            photo.classList.remove('show');
        });
        viewMoreBtn.textContent = "查看更多";
        viewMoreBtn.classList.remove('less');
        showingAllPhotos = false;
        
        document.querySelector('.class-photos-container').scrollIntoView({
            behavior: 'smooth'
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimations();
    window.addEventListener('scroll', handleScrollAnimations);

    document.addEventListener("keydown", function(event) {
        if (document.getElementById("lightbox").style.display === "block") {
            if (event.key === "ArrowLeft") {
                changeImage(-1);
            } else if (event.key === "ArrowRight") {
                changeImage(1);
            } else if (event.key === "Escape") {
                closeLightbox();
            }
        }
    });

    const gridItems = document.querySelectorAll('.grid-item');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalImage = document.getElementById('modal-image');
    const hamburger = document.querySelector('.hamburger');
    
    if (gridItems && modal && modalClose && modalTitle && modalDescription && modalImage) {
        gridItems.forEach(item => {
            item.addEventListener("click", function() {
                const title = this.getAttribute("data-title");
                const description = this.getAttribute("data-description");
                const image = this.getAttribute("data-image");
                
                modalTitle.textContent = title;
                modalDescription.innerHTML = description;
                modalImage.src = image;
                
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; 
                hamburger.style.display = 'none'; 
            });
        });
        
        modalClose.addEventListener("click", function() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; 
            hamburger.style.display = ''; 
        });
        
        modal.addEventListener("click", function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; 
                hamburger.style.display = ''; 
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = ''; 
                hamburger.style.display = ''; 
            }
        });
    }
}); 